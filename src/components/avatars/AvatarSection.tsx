import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import AccountAvatar from './AccountAvatar';

const AvatarSection = () => {
    return (
        <Stack className="avatar-section" spacing={2} direction="row" sx={{ color: 'action.active' }}>
            <AccountAvatar />
            {/* <IconButton aria-label="cart">
                <Badge color="secondary" badgeContent={3}>
                    <NotificationsIcon />
                </Badge>
            </IconButton> */}
        </Stack>
    )
}

export default AvatarSection;