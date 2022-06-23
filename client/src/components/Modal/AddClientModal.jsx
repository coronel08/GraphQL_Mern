import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../../mutations/clientMutations";
import { GET_CLIENTS } from "../../queries/clientQueries";

function AddClientModal() {
//   const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()


  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  //  handle adding a user in modal
  function handleSubmit(event) {
    event.preventDefault();

    // submit to graphql
    addClient(name, email, phone)


    // other way of setting state, if value comes from an input push to state
    // Object.entries(event.target).map((evt) => {
    //   if (evt[1].localName === "input") {
    //     console.log("Written to state", { [evt[1].id]: evt[1].value });
    //     setFormData((prev) => ({
    //       ...prev,
    //       [evt[1].id]: evt[1].value,
    //     }));
    //   }
    // });

    // other way of setting state.
    // const data = new FormData(event.currentTarget);
    // const name = data.get("name");
    // const email = data.get("email");
    // const phone = data.get("phone");
    // console.log(name, email, phone)
    // setFormData({
    //   name,
    //   email,
    //   phone,
    // });
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <span className="px-2">Add Client</span>
        </div>
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Enter Information
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}

                  />
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </form>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddClientModal;
