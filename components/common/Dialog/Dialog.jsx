import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton
} from '@mui/material';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';
  
const Dialog = ({ 
  open, 
  onClose, 
  title, 
  description, 
  buttonSettings = [] 
}) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <X />
      </IconButton>
      <DialogTitle 
        sx={{
          pt: 3,
          px: 3,
          fontSize: '20px',
          fontWeight: 'bold',
          pr: 6
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ px: 3 }}>
        <DialogContentText 
          sx={{
            color: 'text.primary'
          }}
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {buttonSettings.map((button, index) => (
          <Button
            key={button.text}
            variant={index === buttonSettings.length - 1 ? 'outlined' : 'contained'}
            onClick={button.onClick}
            sx={{
              width: '144px',
              height: '40px'
            }}
          >
            {button.text}
          </Button>
        ))}
      </DialogActions>
    </MuiDialog>
  );
};

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonSettings: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    })
  )
};

export default Dialog; 