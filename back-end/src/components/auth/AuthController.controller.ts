import BaseController from "../../common/BaseController";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { IUserLoginDto } from "./dto/KorisnikLoginVal";
import { DevConfig } from "../../config";
import { Request, Response } from "express";
import AuthMiddleware from "./AuthMiddleware";

export default class AuthController extends BaseController {
    public async userLogin(req: Request, res: Response) {
        const data = req.body as IUserLoginDto;
        this.services.korisnik.getByEmail(data.email)
        .then(result => {
            if (!result.korisnik_id) {
                throw {
                    status: 404,
                    message: "User account not found!"
                };
            }

            return result;
        })
        .then(user => {
            if (!bcrypt.compareSync(data.password, user.pw_hash)) {
                throw {
                    status: 404,
                    message: "Username or password is not correct"
                };
            }

            return user;
        })
        .then(user => {
            const tokenData = {
                role: "user",
                id: user.korisnik_id,
                identity: user.korisnicko_ime
            };
            const authToken = jwt.sign(tokenData, DevConfig.auth.user.tokens.auth.keys.private, {
                algorithm: DevConfig.auth.user.algorithm,
                issuer: DevConfig.auth.user.issuer,
                expiresIn: DevConfig.auth.user.tokens.auth.duration,
            });
            
            const refreshToken = jwt.sign(tokenData, DevConfig.auth.user.tokens.refresh.keys.private, {
                algorithm: DevConfig.auth.user.algorithm,
                issuer: DevConfig.auth.user.issuer,
                expiresIn: DevConfig.auth.user.tokens.refresh.duration,
            });

            res.send({
                authToken: authToken,
                refreshToken: refreshToken,
                id: user.korisnik_id,
            });
        })
        .catch(error => {
            console.log(error)
            setTimeout(() => {
                res.status(error?.status ?? 500).send(error?.message);
            }, 1500);
        });
    }

    userRefresh(req: Request, res: Response) {
        const refreshTokenHeader: string = req.headers?.authorization ?? ""; // "Bearer TOKEN"

        try {
            const tokenData = AuthMiddleware.validateTokenAs(refreshTokenHeader, "user", "refresh");
    
            const authToken = jwt.sign(tokenData, DevConfig.auth.user.tokens.auth.keys.private, {
                algorithm: DevConfig.auth.user.algorithm,
                issuer: DevConfig.auth.user.issuer,
                expiresIn: DevConfig.auth.user.tokens.auth.duration,
            });
    
            res.send({
                authToken: authToken,
            });
        } catch (error) {
            res.status(error?.status ?? 500).send(error?.message);
        }
    }
}