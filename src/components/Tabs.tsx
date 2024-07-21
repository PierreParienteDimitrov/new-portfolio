interface Tab {
    name: string;
    href: string;
    current: boolean;
    key: string;
}

interface TabsProps {
    tabs: Tab[];
    onTabClick: (tabName: string) => void;

}



export default function Tabs({ tabs, onTabClick }: TabsProps) {
    return (
        <div className="flex flex-col space-y-8">
            <ul
                role="list"
                className="font-bold uppercase leading-6 "
            >
                {tabs.map((tab) => (
                    <li key={tab.name} onClick={() => onTabClick(tab.key)}>
                        <a href={tab.href} className={tab.current ? 'text-gray-900' : 'text-gray-500 transition duration-300 ease-in-out hover:text-gray-900'}>
                            <h1>
                                {tab.name}
                            </h1>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}