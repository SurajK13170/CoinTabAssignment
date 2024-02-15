import React, { useEffect, useState } from 'react'


function Home() {
    const [userIds, setUsersIds] = useState(new Set)
    const [fetchData, setFetchData] = useState([]);
    const [isAdding, setAdding] = useState(false)

    const fetchUsers = async () => {
        let Api = 'https://jsonplaceholder.typicode.com/users';
        try {
            const response = await fetch(Api);
            const data = await response.json();
            setFetchData(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddUser = async (user) => {
        try {
            setAdding(true)
            const userDataToAdd = {
                _id:user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                website: user.website,
                city: user.address.city,
                company: user.company.name
            };

            // console.log(userDataToAdd)
            const response = await fetch('https://sore-red-basket-clam-kit.cyclic.app/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDataToAdd),
            });

            if (response.ok) {
                const newUser = await response.json();
                setUsersIds(userIds => {
                    let newUserId = new Set(userIds)
                    newUserId.add(newUser._id)
                    return newUserId
                })
            } else {
                console.error('Failed to add user:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }finally{
            setAdding(false)
        }
    };

    useEffect(() => {
        const fetchUsersIds = async () => {
            const response = await fetch('https://sore-red-basket-clam-kit.cyclic.app/users')
            const users = await response.json()
            setUsersIds(new Set(users.map(user => user._id)))
        }
        fetchUsersIds()
    }, [])


    return (
        <div>
            <div>
                <h1>Cointab SE-ASSIGNMENT</h1>
                <button onClick={fetchUsers}>All Users</button>
                <table hidden={!Boolean(fetchData.length)}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>City</th>
                            <th>Company</th>
                            <th>Buttons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchData.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.website}</td>
                                <td>{user.address.city}</td>
                                <td>{user.company.name}</td>
                                <td>
                                    {
                                        userIds.has(user.id) ? (
                                            <button onClick={() => window.location = `/post/${user.id}`}>Open</button>
                                        ):<button disabled={isAdding} onClick={() => handleAddUser(user)}>ADD</button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home
