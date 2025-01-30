// import React, { useState } from "react";
// import { IconButton, Modal, Box } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// const Actions: React.FC = () => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleDelete = () => {
//     alert('Are you sure you want to delete?');
//   };

//   return (
//     <div>
//       <IconButton onClick={handleOpen}>
//         <EditIcon />
//       </IconButton>
//       <IconButton onClick={handleDelete}>
//         <DeleteIcon />
//       </IconButton>

//       <Modal open={open} onClose={handleClose}>
//         <Box sx={style}>
//           <h2>Edit Item</h2>
//           {/* Add your edit form or content here */}
//           <button onClick={handleClose}>Close</button>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default Actions;

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { IconButton, Modal, Box, FormControlLabel, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExploreIcon from '@mui/icons-material/Explore';
import Swal from 'sweetalert2';
import axios from 'axios';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const headerStyle = {
  fontSize: '24px',
  marginBottom: '20px',
  fontWeight: 'bold',
  textAlign: 'center' as 'center',
};

const inputStyle = {
  display: 'block',
  marginBottom: '10px',
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const buttonStyle = {
  marginRight: '10px',
  padding: '10px 20px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
  fontSize: '16px',
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#6c757d',
};

interface ActionsProps {
  id: string;
  initialData: { [key: string]: any }; // The initial values for the form fields
  updateUrl?: string; // URL for update action
  deleteUrl: string; // URL for delete action
  exploreUrl?: string;
  token?: any;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<any>>;

}

const Actions: React.FC<ActionsProps> = ({ id, initialData, updateUrl, deleteUrl, exploreUrl, token, refresh, setRefresh }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Use useEffect to ensure formData is updated when initialData or id changes
  useEffect(() => {
    setFormData(initialData); // Set formData to the new initialData when id changes
  }, [id, initialData]);

  const handleExplore = () => {
    router.push(`${exploreUrl}/${id}`); // Redirect to dynamic URL
  };

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleUpdate = async () => {
    try {
      const result = await axios.put(`${updateUrl}`, { ...formData, id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(result)
      if (result) {
        // setRefresh(true)
        setRefresh((prev: any) => !prev)
      }
      Swal.fire('Updated!', 'Record updated successfully!', 'success');
      handleClose();
    } catch (error) {
      console.error("Error updating record", error);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(`${deleteUrl}`, { id: id }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
          setRefresh((prev: any) => !prev)
          Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
        } catch (error) {
          console.error("Error deleting record", error);
          Swal.fire('Error!', 'There was an issue deleting the record.', 'error');
        }
      }
    });
  };

  return (
    <div>
      {exploreUrl && (
        <IconButton style={{ color: 'gray' }} onClick={handleExplore}>
          <ExploreIcon />
        </IconButton>
      )}
      {updateUrl && (
        <IconButton style={{ color: 'green' }} onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      )}
      <IconButton style={{ color: 'red' }} onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2 style={headerStyle}>Edit Item</h2>
          {formData && Object.keys(formData).length > 0 ? (
            <div>
              {Object.keys(formData).map((key) => {

                return typeof formData[key] === 'boolean' ? (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={formData[key]}
                        name={key}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={key}
                  />
                ) : (
                  <div key={key}>
                    <label>{key}</label>
                    <input
                      type="text"
                      name={key}
                      style={inputStyle}
                      value={formData[key] || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                );
              })}
              <div style={{ marginTop: '20px' }}>
                <button style={buttonStyle} onClick={handleUpdate}>Save Changes</button>
                <button style={cancelButtonStyle} onClick={handleClose}>Cancel</button>
              </div>
            </div>
          ) : (
            <p>No data available to edit.</p>
          )}
        </Box>
      </Modal>

    </div>
  );
};

export default Actions;
