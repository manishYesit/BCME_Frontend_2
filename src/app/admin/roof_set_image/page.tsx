"use client";
import { useState, useEffect, useRef } from "react";
import Hammer from "../../../../public/dist/img/hammer-tool.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";
import Typography from "@mui/material/Typography";
import apiEndpoints from "../../../../config/apiEndpoints";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdDone } from "react-icons/md";
import { VscDebugRestart } from "react-icons/vsc";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import axios from "axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";

interface HammerPosition {
  id: number;
  x: number;
  y: number;
  data: any;
  hammerPositions: any;
}

interface HammerData {
  title: any;
  information: any;
  id: any;
  x: any;
  y: any;
}

export default function RoofSetOnImage() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [hammerPositions, setHammerPositions] = useState<HammerPosition[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedHammerId, setDraggedHammerId] = useState<any>(null);
  const [hammerImg, setHammerImg] = useState<HTMLImageElement | null>(null);
  const [backgroundImg, setBackgroundImg] = useState<HTMLImageElement | null>(
    null
  );
  const [data, setData]: [any, Function] = useState([]);
  const [image, setImage] = useState<any>(null);
  const [inputTitle, setInputTitle] = useState<string | null>(null);
  const [inputInformation, setInputInformation] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [linkRowId, setLinkRowId] = useState<string | null>(null);
  const [clickHammerData, setClickHammerData] = useState<HammerData | null>(
    null
  );
  const [positionsValue, setPositionsValue] = useState<any | null>(null);

  const [open, setOpen] = useState(false);
  const toast = useRef<Toast>(null);
  const canvasRef = useRef<HTMLCanvasElement | any>(null);

  // console.log("checkroofimageDatatt--2", positionsValue?.x);

  const imgWidth = 45;
  const imgHeight = 45;

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    width: "50%",
    gap: "16px",
    border: "1px solid #000",
  };

  const headerStyle = {
    fontWeight: 400,
    fontSize: "14px",
  };

  // Load the hammer image and background image
  useEffect(() => {
    if (token) {
      fetchData(token);
      // updateRoofCordinate(token);
    }
  }, [token]);

  async function fetchData(token: any) {
    try {
      const { data } = await axios.get(apiEndpoints.getRoofData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function UploadRoofImage(token: any, image: File) {
    try {
      const formData = new FormData();
      formData.append("file", image);

      const result = await axios.post(apiEndpoints.uploadRoofImage, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // setImage(result.data.data);

      toast.current?.show({
        severity: "success",
        detail: "Your image has been uploaded.",
        life: 3000,
      });
      setImage(null);
    } catch (error) {
      console.error("Error occurred:", error);
      toast.current?.show({
        severity: "error",
        detail: "error. Please try again.",
        life: 3000,
      });
    }
  }

  async function updateRoofCordinate(token: any) {
    try {
      let payload = {
        id: positionsValue?.id,
        abscissa: positionsValue?.x || 1,
        ordinate: positionsValue?.y || 1,
      };
      clickHammerData;
      const result = await axios.post(
        apiEndpoints.updateRoofCordinate,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(result.data.data);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  useEffect(() => {
    const fetchImages = async (token: string) => {
      try {
        // Fetch image data from API
        const response = await axios.get(apiEndpoints.getRoofImage, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const imageUrl =
          "http://3.12.198.252/api/assets/images/roof/" +
          response.data.data.image;
        // let cheackimage =
        //   "http://3.12.198.252/api/assets/images/roof/" + imageUrl;
        // console.log("checkedimageUrlllll", cheackimage);

        if (imageUrl) {
          // Load the background image
          const bgImg = new Image();
          bgImg.src = imageUrl;
          bgImg.onload = () => {
            setBackgroundImg(bgImg);
          };
        }

        const hammer = new Image();
        hammer.src = Hammer.src;
        hammer.onload = () => {
          setHammerImg(hammer);
        };

        const fetchedPositions = data.map((item: any) => ({
          id: item.id,
          x: parseInt(item.abscissa),
          y: parseInt(item.ordinate),
          data: item,
        }));

        setHammerPositions(fetchedPositions);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (token) {
      fetchImages(token);
    }
  }, [data, token, image]);

  useEffect(() => {
    // Draw the canvas after positions and images are loaded
    const drawCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (canvas && ctx && backgroundImg && hammerImg) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background image
        ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

        // Draw hammer images at each position
        hammerPositions.forEach((hammer) => {
          ctx.drawImage(hammerImg, hammer.x, hammer.y, imgWidth, imgHeight);
        });
      }
    };

    drawCanvas();
  }, [hammerPositions, hammerImg, backgroundImg]);

  // Handle mouse events for dragging the image
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!hammerImg) return;

    const canvas = canvasRef.current;
    const canvasRect = canvas?.getBoundingClientRect();
    const mouseX = e.clientX - (canvasRect?.left || 0);
    const mouseY = e.clientY - (canvasRect?.top || 0);

    // Find which hammer was clicked on
    const clickedHammer = hammerPositions.find(
      (hammer) =>
        mouseX >= hammer.x &&
        mouseX <= hammer.x + imgWidth &&
        mouseY >= hammer.y &&
        mouseY <= hammer.y + imgHeight
    );

    if (clickedHammer) {
      setDraggedHammerId(clickedHammer.id);
      setClickHammerData(clickedHammer.data);
      setIsDragging(true);
      canvas.style.cursor = "pointer";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && draggedHammerId !== null && hammerImg) {
      const canvas = canvasRef.current;
      const canvasRect = canvas?.getBoundingClientRect();
      const mouseX = e.clientX - (canvasRect?.left || 0);
      const mouseY = e.clientY - (canvasRect?.top || 0);

      const canvasWidth = canvas?.width || 0;
      const canvasHeight = canvas?.height || 0;

      const clampedX = Math.min(
        Math.max(mouseX - imgWidth / 2, 0),
        canvasWidth - imgWidth
      );
      const clampedY = Math.min(
        Math.max(mouseY - imgHeight / 2, 0),
        canvasHeight - imgHeight
      );

      // Update the position of the dragged hammer image
      setHammerPositions((prevPositions) =>
        prevPositions.map((hammer) =>
          hammer.id === draggedHammerId
            ? { ...hammer, x: clampedX, y: clampedY }
            : hammer
        )
      );
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    if (draggedHammerId !== null) {
      const currentHammer = hammerPositions.find(
        (hammer) => hammer.id === draggedHammerId
      );

      if (currentHammer) {
        updateRoofCordinate(token);
      }
    }

    // setDraggedHammerId(null);
  };
  // const handleMouseUp = () => {
  //   setIsDragging(false);
  //   // setDraggedHammerId(null);
  // };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx && backgroundImg && hammerImg) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

      hammerPositions.forEach((hammer) => {
        ctx.drawImage(hammerImg, hammer.x, hammer.y, imgWidth, imgHeight);
      });
    }
  };

  useEffect(() => {
    drawCanvas();
    const hammer = hammerPositions.find(
      (hammer) => hammer.id === draggedHammerId
    );
    if (hammer) {
      setPositionsValue({ id: hammer.id, x: hammer.x, y: hammer.y });
    }
  }, [hammerPositions, hammerImg, backgroundImg]);

  ///crud------------

  const handleValidationForm = () => {
    if (!inputTitle) {
      setFormError("Required.");
      return false;
    }
    if (!inputInformation) {
      setFormError("Required.");
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!handleValidationForm()) {
      return;
    }
    try {
      const payload = {
        id: linkRowId,
        title: inputTitle,
        information: inputInformation,
        linkType: 0,
        abscissa: positionsValue?.x || 1,
        ordinate: positionsValue?.y || 1,
      };
      let apiUrl = clickHammerData
        ? apiEndpoints.updateRoofData
        : apiEndpoints.addRoofData;

      let method = clickHammerData ? axios.put : axios.post;
      const result = await method(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.current?.show({
        severity: "success",
        detail: clickHammerData
          ? "Row Updated successfully!"
          : "Row added successfully!",
        life: 3000,
      });
      handleClose();
      fetchData(token);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (row: any) => {
    setOpen(true);
    setLinkRowId(null);
    resetForm();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
    }
  };

  // Handle Edit Data
  const handleEdit = (rowData: any) => {
    setInputTitle(rowData.title);
    setInputInformation(rowData.information);
    setLinkRowId(rowData.id);
    setOpen(true);
  };
  // Reset form fields
  const resetForm = () => {
    setInputTitle(null);
    setInputInformation(null);
    setFormError(null);
    setClickHammerData(null);
    setPositionsValue(null);
  };

  console.log("checkhammerpositiondraggedHammerId", draggedHammerId);
  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>{"Dashboard >> Roof"}</h1>
            </div>
          </div>
          <div className="col-sm-12 btn-container mt-2">
            <div>
              <button className="add_btn" onClick={handleOpen}>
                Add
              </button>
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <button
                className="submit_img"
                style={{
                  background: "#629B58",
                  borderColor: "#87B87F",
                  color: "white",
                }}
                onClick={() => UploadRoofImage(token, image)}
              >
                Submit Image
              </button>
            </div>
          </div>
        </div>

        {/* Display position for only the dragged hammer */}
        {/* {draggedHammerId !== "Position : x = y=" && (
          <div style={{ marginTop: "10px", borderTop: "1px solid #E2E2E2" }}>
            <div>
              Position : x ={" "}
              {hammerPositions
                .find((hammer) => hammer.id === draggedHammerId)
                ?.x.toFixed(2)}
              , y ={" "}
              {hammerPositions
                .find((hammer) => hammer.id === draggedHammerId)
                ?.y.toFixed(2)}
            </div>
          </div>
        )} */}
        <div className="" style={{ display: "flex" }}>
          {/* Canvas container */}
          <div
            className="canvas-container"
            style={{
              position: "relative",
              width: "600px",
              height: "400px",
            }}
          >
            {draggedHammerId !== "Position : x = y=" && (
              <div style={{ borderTop: "none", position: "absolute", top: "2px", marginLeft: "20px", userSelect: "none" }} 
                onMouseDown={(event) => event.preventDefault()}>
                {hammerPositions
                  .find((hammer) => hammer.id === draggedHammerId)
                  ?
                  <div>
                    Position : x ={" "}
                    {hammerPositions
                      .find((hammer) => hammer.id === draggedHammerId)
                      ?.x.toFixed(2)}
                    , y ={" "}
                    {hammerPositions
                      .find((hammer) => hammer.id === draggedHammerId)
                      ?.y.toFixed(2)}
                  </div>
                  : null}
              </div>
            )}
            <canvas
              ref={canvasRef}
              width="600"
              height="400"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            ></canvas>
          </div>
          {clickHammerData && (
            <div className="set_on_image">
              <h1 style={{ fontSize: "24px", paddingBottom: "10px" }}>
                {clickHammerData?.title}
              </h1>
              <p>{clickHammerData?.information}</p>

              <Box ml={4}>
                <button
                  type="button"
                  className="modal_submit_btn"
                  style={{
                    backgroundColor: "#4F99C6",
                    borderColor: "#6FB3E0",
                    marginLeft: "20px",
                    minWidth: "80px",
                  }}
                  // onClick={handleEdit}
                  onClick={() => handleEdit(clickHammerData)}
                >
                  <MdDone size={20} /> Edit
                </button>
              </Box>
            </div>
          )}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <div id="modal-modal-title" className="modal_header">
              <div>{clickHammerData?.id ? "Update" : "Add"}</div>
              <div
                style={{ fontWeight: 600, cursor: "pointer", fontSize: "18px" }}
                onClick={handleClose}
              >
                X
              </div>
            </div>

            <Box>
              <Box display="flex" alignItems="center" gap="12px" ml={2}>
                <Box flex={1}>
                  <label style={headerStyle}>Title</label>
                </Box>
                <Box flex={3}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={inputTitle || ""}
                    onChange={(e) => setInputTitle(e.target.value)}
                    // onBlur={validateTitle}
                    style={{ width: "80%" }}
                  />
                  {!inputTitle && (
                    <Typography variant="body2" color="error">
                      {formError}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap="12px" mt={2} ml={2}>
                <Box flex={1}>
                  <label style={headerStyle}>Information</label>
                </Box>
                <Box flex={3}>
                  <textarea
                    className="form-control"
                    placeholder="Information"
                    value={inputInformation || ""}
                    onChange={(e) => setInputInformation(e.target.value)}
                    style={{
                      width: "80%",
                      height: "80px",
                      overflowY: "auto",
                      padding: "8px",
                      fontSize: "14px",
                    }}
                  />
                  {!inputInformation && (
                    <Typography variant="body2" color="error">
                      {formError}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box ml={8}>
                <button
                  type="button"
                  className="modal_submit_btn"
                  onClick={handleSubmit}
                >
                  <MdDone size={20} /> {linkRowId ? "Update" : "Submit"}
                </button>
                {!linkRowId && (<button
                  type="button"
                  className="modal_submit_btn"
                  style={{
                    backgroundColor: "#8B9AA3",
                  }}
                  onClick={resetForm}
                >
                  <VscDebugRestart size={20} /> Reset
                </button>)}
              </Box>
            </Box>

            {/* Update Button */}
            <div>
              <button
                type="button"
                className="modal_close_btn"
                onClick={handleClose}
              >
                <span>X</span> Close
              </button>
            </div>
          </Box>
        </Modal>
      </section>
      <Toast ref={toast} />
      <ConfirmDialog />
    </>
  );
}
