import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

export interface IUserLoginDto {
    email: string;
    password: string;
}

const UserLoginValidator = ajv.compile({
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email",
        },
        password: {
            type: "string",
            minLength: 8
        }
    },
    required: [
        "email",
        "password",
    ],
    additionalProperties: false,
});

export { UserLoginValidator };