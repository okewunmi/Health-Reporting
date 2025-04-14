// // contexts/RequestContext.js
// "use client"
// import { createContext, useContext, useState, useEffect } from 'react'
// import { getCurrentUser } from "../lib/appwrite";


// const RequestContext = createContext()

// export const RequestProvider = ({ children }) => {
//   const [isLogged, setIsLogged] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getCurrentUser()
//       .then((res) => {
//         if (res) {
//           setIsLogged(true);
//           setUser(res);
//         } else {
//           setIsLogged(false);
//           setUser(null);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const [counts, setCounts] = useState({
//     total: 0,
//     rejected: 0,
//     approved: 0
//   })

//   const incrementCount = (type = 'total') => {
//     setCounts(prev => ({ ...prev, [type]: prev[type] + 1 }))
//   }

//   return (
//     <RequestContext.Provider value={{
//       counts, 
//       incrementCount, 
//       isLogged,
//       setIsLogged,
//       user,
//       setUser,
//       loading,
//     }}>
//       {children}
//     </RequestContext.Provider>
//   )
// }

// export const useRequests = () => useContext(RequestContext)

// contexts/RequestContext.js
"use client"
import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser } from "@/lib/appwrite"

const RequestContext = createContext()

export const RequestProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [counts, setCounts] = useState({
    total: 0,
    rejected: 0,
    approved: 0
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (currentUser) {
          setIsLogged(true)
          setUser({
            ...currentUser,
            // Ensure these fields exist in your user document
            surname: currentUser.surname || '',
            otherNames: currentUser.otherNames || ''
          })
        } else {
          setIsLogged(false)
          setUser(null)
        }
      } catch (error) {
        console.error("Failed to fetch user:", error)
        setIsLogged(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const incrementCount = (type = 'total') => {
    setCounts(prev => ({ ...prev, [type]: prev[type] + 1 }))
  }

  return (
    <RequestContext.Provider value={{
      counts,
      incrementCount,
      isLogged,
      user,
      loading
    }}>
      {children}
    </RequestContext.Provider>
  )
}

export const useRequests = () => useContext(RequestContext)