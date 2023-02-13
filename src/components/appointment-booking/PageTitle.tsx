interface Props {
    title: string;
}

const PageTitle = ({ title }: Props) => {
    return (
            <h2 className="pt-10 font-bold text-center m-4 mb-8">{ title }</h2>
    )
}

export default PageTitle;