import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

type LinkTextProps = {
    label: string;
};

const LinkText: React.FC<LinkTextProps> = ({ label }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push('new-page');
    }
    return (
        <>
            <Typography
                variant="caption"
                sx={{ color: 'blue', cursor: 'pointer' }}
                onClick={handleClick}
            >
                {label}
            </Typography>
        </>
    )
};

export default LinkText;