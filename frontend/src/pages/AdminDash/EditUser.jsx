import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./editUser.css";
import axios from "axios";

function EditUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const userId = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    trigger,
    formState: { errors },
    reset,
  } = useForm();
  console.log("userId",userId);
  useEffect(() => {
    axios
      .get(`/edituser/${userId}`)
      .then((resp) => {
        console.log(resp.data.name);
        setName(resp.data.name);
        setEmail(resp.data.email);
      })
      .catch((err) => {});
  }, []);

  const onSubmit = async (e) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.patch(
        `/edituser/${userId.userId}`,
        {
          name,
          email,
        },
        config
      );
      navigate("/admin");

      console.log("updatae", data);
    } catch (error) {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 mt-5">
            <div>
              <h3 className="text-center">UPDATE</h3>
            </div>

            <div className="form-grop mt-4">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`form-control  ${errors.name && "invalid"}`}
                placeholder="enter a name"
                required
                //   {...register("name", {
                //     required: "Name is required",
                //     pattern: {
                //       value: /^[a-zA-Z]+$/,
                //       message: "Only Contains Character",
                //     },
                //   })}
                //   onKeyUp={() => {
                //     trigger("name");
                //   }}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </div>

            <div className="form-group">
              <label className="label">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                value={email}
                className={`form-control  ${errors.email && "invalid"}`}
                placeholder="enter your email"
                required
                //   {...register("email", {
                //     required: "Email is required",
                //     pattern: {
                //       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                //       message: "invalid email address",
                //     },
                //   })}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>

            {error && <div className="error_msg">{error}</div>}
            <div className="text-center">
              <button className="btn btn-primary mt-4" onClick={onSubmit}>
                UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
