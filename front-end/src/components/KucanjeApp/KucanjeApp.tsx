export default function KucanjeApp() {
    return (
        <>

        <div className="m-5"></div>
            <div className="d-flex justify-content-end">
                <select name="nivoi" className="form-control w-25">
                    <option value={"veoma-sporo"}>Veoma sporo</option>
                    <option value={"sporo"}>Sporo</option>
                    <option value={"srednje"}>Srednje</option>
                    <option value={"brzo"}>Brzo</option>
                    <option value={"veoma-brzo"}>Veoma brzo</option>
                </select>
            </div>

          <div className="m-5"></div>

          <div className="w-75 border border-dark p-3 m-auto display-4" style={{borderWidth: "2px", borderStyle: "solid", background: "#6495ED"}}>
            Test
          </div>

          <div className="m-5"></div>
        <div className="w-75 m-auto">

          <input type="text" id="userInput" name="userInput" className="form-control" style={{fontSize: 25}} />
        
        </div>

        <div className="m-5"></div>

        <div className="w-50 m-auto">
            <button id="zapocni" className="btn btn-success w-100 p-4" style={{fontSize: 25}}>Zapocni</button>
        </div>
        </>
    );
}