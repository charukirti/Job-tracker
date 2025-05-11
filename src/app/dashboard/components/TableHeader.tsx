interface TableHeaderProp {
    heading : string
}

export default function TableHeader({heading}:TableHeaderProp) {
    return (
        <th scope="col" className="px-6 py-3 text-left text-lg font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            {heading}
        </th>
    )
}

