import React from 'react'

const Authentication = ({ logData, handleLoginSubmit, handleLogValueChange }) => {

    return (
        <section className="w-full h-full flex flex-col items-center justify-center pb-16">
            <div className="max-w-sm w-full text-gray-600 border rounded-lg shadow-lg p-8">
                <div className="text-center space-y-2">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Log in to your account</h3>
                </div>
                <form
                    onSubmit={handleLoginSubmit}
                    className="space-y-5 mt-8"
                >
                    <div>
                        <label className="font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            id='username'
                            name='username'
                            required
                            value={logData.username}
                            onChange={handleLogValueChange}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            required
                            value={logData.password}
                            onChange={handleLogValueChange}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <button
                        type='submit'
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                        disabled={logData.username === "" || logData.password === ""}
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Authentication