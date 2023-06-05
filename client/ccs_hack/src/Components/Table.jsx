const Table = ({ jsonData }) => {
    let i = 1;
    return (
        <div className="border-dashed p-2">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Sr No.</th>
                        <th className="px-6 py-3">Medicine Name</th>
                        <th className="px-6 py-3">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {jsonData.map(obj=>
                        <tr key={obj.name} className="bg-white border-b text-gray-800">
                            <td className="px-6 py-3">{i++}</td>
                            <td className="px-6 py-3">{obj.name}</td>
                            <td className="px-6 py-3">{obj.quantity}</td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table