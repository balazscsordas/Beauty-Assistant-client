import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

interface Props {
    href: string;
}

const EditIconButton = ({ href }: Props) => {
    return (
        <Link href={ href } className="ml-2">
            <EditIcon fontSize='small' className='mb-2'/>
        </Link>
    )
}

export default EditIconButton;