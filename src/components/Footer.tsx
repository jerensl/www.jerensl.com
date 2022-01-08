import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Footer = (): React.ReactElement => {
    return (
        <footer className="grid justify-center h-1/10 place-items-center text-center shadow-inner dark:border-t-2 dark:border-gray-50 md:px-10 md:flex md:flex-row md:justify-between">
            <div className="flex space-x-5 py-1">
                <a className="md:p-2" href="https://github.com/jerensl">
                    <FontAwesomeIcon
                        className="text-3xl transform hover:scale-125"
                        icon={['fab', 'github-square']}
                    />
                </a>
                <a className="md:p-2" href="https://twitter.com/jerensl22">
                    <FontAwesomeIcon
                        className="text-3xl transform hover:scale-125"
                        icon={['fab', 'twitter-square']}
                    />
                </a>
                <a
                    className="md:p-2"
                    href="https://www.linkedin.com/in/jerensl/"
                >
                    <FontAwesomeIcon
                        className="text-3xl transform	hover:scale-125"
                        icon={['fab', 'linkedin']}
                    />
                </a>
            </div>
            <p>
                © {new Date().getFullYear()} Jerens Lensun. All Rights Reserved.
            </p>
        </footer>
    )
}
