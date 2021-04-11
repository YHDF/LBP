import React from "react";



export default function TableManager(props) {
    return (
        <div className="table_manager">
            <div className="mb-3" style={{ display: "inline-block" }}>
                <label htmlFor="exampleFormControlInput1" className="form-label">Nom de {props.name}</label>
                <div style={{ width: "100%" }}><input type="text" className="form-control" ref={props.category} id="exampleFormControlInput1" placeholder="Nom" /></div>
            </div>

            <div className="mb-3" style={{ display: "inline-block", marginLeft: "10%" }}>
                <label htmlFor="exampleFormControlInput1" className="form-label">Admin</label>
                <div style={{ width: "100%" }}><input type="text" className="form-control" ref={props.admin} id="exampleFormControlInput2" placeholder="Admin" readOnly/></div>
            </div>
            <div className="mb-3" style={{ display: "inline-block", marginLeft: "50%" }}>
            <button type="button" className="btn btn-success" onClick={() => props.modifi_f() }>Valider</button>
            </div>
        </div>
    )

}