import React, { useEffect } from "react";
import UserIcon from "../assets/icon-user.png";
import "./User.css";
import { getProducts } from "../utils/db";
import { useState } from "react";
 
import { useUser } from "../contexts/AuthContext";
import Heading from "../components/Heading";
import { useNavigate } from "react-router-dom";

export default function () {
	const navigate = useNavigate();
	const user = useUser();

	if(user == null){
		navigate("/");
		return null;
	}

	return (
		<div className="profile-page">
            <Heading style={{marginTop: "2rem"}}>Mi cuenta</Heading>
			<div className="user-data">
				
				<h1 className="data-title">Datos</h1>
				<img src={UserIcon} alt="User image" className="user-icon" />
				<p className="username">Nombre de usuario: {user.username} </p>
			</div>
	 
		</div>
	);
}
