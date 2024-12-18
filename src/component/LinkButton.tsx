import Button from '@mui/material/Button';

type LinkButtonProps = {
    label: string;
  };

const LinkButton: React.FC<LinkButtonProps> = ({label}) => {
    return (
        <>
            <Button variant="contained" sx={{
                    backgroundColor: 'lightgreen',  
                    color: 'black',
                    fontSize: '12px',
                    padding: '4px 12px',
                    '&:hover': {
                        backgroundColor: 'green',
                    },
                }} color="primary" >
                {label}
            </Button>
        </>
    )
};

export default LinkButton;