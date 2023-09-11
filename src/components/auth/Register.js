import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import { getAllFranchises } from "../../managers/FranchiseManager"


export const Register = ({ setToken }) => {
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const password = useRef()
  const bio = useRef()
  const display_name = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value,
        display_name: display_name.current.value,
        favorite_franchise: selectedFranchise
      }

      registerUser(newUser)
        .then(res => {
          if ("valid" in res && res.valid) {
            setToken(res.token)
          }
          navigate("/login")
        })
    } else {
      passwordDialog.current.showModal()
    }
  }

  const [selectedFranchise, setSelectedFranchise] = useState('');
  const [franchises, setFranchises] = useState([])
  useEffect(() => {
    getAllFranchises()
      .then((franchiseList) => {
        setFranchises(franchiseList);
      });
  }, []);

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleRegister}>
        <h1 className="title">Bravo Bestie</h1>
        <p className="subtitle">Create an account</p>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input className="input" type="text" ref={firstName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input className="input" type="text" ref={lastName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Display Name</label>
          <div className="control">
            <input className="input" type="display_name" ref={display_name} />
          </div>
        </div>

        <div className="field">
          <label className="label">Bio</label>
          <div className="control">
            <textarea className="textarea" placeholder="Tell us about yourself..." ref={bio}></textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" ref={email} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Password" ref={password} />
              </p>
            </div>

            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
              </p>
            </div>

            <fieldset>
              <div className="form-group">
                <label htmlFor="category">Favorite Bravo Show: </label>
                <select
                  name="category"
                  required autoFocus
                  className="form-control"
                  value={selectedFranchise.id}
                  onChange={(evt) => {
                    setSelectedFranchise(parseInt(evt.target.value))
                  }
                  }
                >
                  <option value="">Select Show</option>
                  {franchises.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
          </div>
        </div>


        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Submit</button>
          </div>
          <div className="control">
            <Link to="/login" className="button is-link is-light">Cancel</Link>
          </div>
        </div>

      </form>
    </section>
  )
}