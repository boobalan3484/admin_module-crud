import React from 'react'

const SectionTitle = ({ location }) => {

    let path = location.pathname.substring(1)

    const navigation = [
        { path: "home", title: "dashboard" },
        { path: "employee", title: "employee list" },
        { path: "employee/add", title: "create new employee" },
    ]

    const pathTitle = {}
    navigation.forEach(item => {
        pathTitle[item.path] = item.title
    })

    // Check for dynamic path
    const dynamicTitle = path.includes('employee/edit') ? "update employee" : null;
    
    const title = dynamicTitle || pathTitle[path] || path;

    return (
        <div className="w-full cursor-default">
            <div className="max-w-screen-xl mx-auto px-4 py-4 md:px-8">
                <h3 className="text-gray-800 text-lg font-medium capitalize">
                    {title}
                </h3>
            </div>
        </div>
    )
}

export default SectionTitle