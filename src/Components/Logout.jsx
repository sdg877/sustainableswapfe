
import { useEffect } from "react"
import axios from "axios"

export default function Logout() {
    useEffect(() => {
        (async () => {
            try {
                await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/logout/`,
                    {
                        refresh_token: localStorage.getItem("refresh_token"),
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                )
                localStorage.clear()
                console.log("Logout successful")
                axios.defaults.headers.common["Authorization"] = null
                window.location.href = "/"
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log("Logout not working", error.response.data)
                } else {
                    console.log("Logout not working", error.message)
                }
            }
        })()
    }, [])

    return <div></div>
}
