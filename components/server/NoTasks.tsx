

const NoTasks = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8 text-center border border-dashed rounded-lg mt-8 bg-secondary dark:bg-gray-900/50">
            <svg
                className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                This Board is Empty
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-500">
                Time to get started! Create your first task to fill up the board.
            </p>
        </div>
    )
}

export default NoTasks