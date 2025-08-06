import { useEffect, useState, useRef } from "react";
import { fetchPositions, fetchToken, postUser } from "../../services/api";
import { validateForm, validatePhotoDimensions } from "../../utils/validation";


export function useRegistrationForm(onUserRegistered) {
  const [positions, setPositions] = useState([]);
  const [positionId, setPositionId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: null,
  });

  const fileInputRef = useRef(null);
  const photoValidationCounter = useRef(0);

  useEffect(() => {
    fetchPositions().then(data => {
      setPositions(data.positions);
      if (data.positions.length > 0) {
        setPositionId(data.positions[0].id);
      }
    });
  }, []);


  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      const file = files[0] || null;
      setFormData(prev => ({ ...prev, photo: file }));

      if (file) {
        const currentValidationId = ++photoValidationCounter.current;
        const errorMsg = await validatePhotoDimensions(file);

        if (currentValidationId === photoValidationCounter.current) {
          setErrors(prev => {
            const newErrors = { ...prev };
            if (errorMsg) {
              newErrors.photo = errorMsg;
            } else {
              delete newErrors.photo;
            }
            return newErrors;
          });
        }
      } else {
        setErrors(prev => ({ ...prev, photo: "Photo is required" }));
      }
    } else {
      const updatedData = { ...formData, [name]: value };
      setFormData(updatedData);

      const validationErrors = validateForm({ ...updatedData, position_id: positionId });
      setErrors(validationErrors);
    }
  };


  const handlePositionChange = (e) => {
    const id = Number(e.target.value);
    setPositionId(id);

    const validationErrors = validateForm({ ...formData, position_id: id });
    setErrors(validationErrors);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm({ ...formData, position_id: positionId });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const token = await fetchToken();

        const form = new FormData();
        form.append("name", formData.name);
        form.append("email", formData.email);
        form.append("phone", formData.phone);
        form.append("position_id", positionId);
        form.append("photo", formData.photo);

        const result = await postUser(form, token);

        if (result.success) {
          setFormData({ name: "", email: "", phone: "", photo: null });
          setPositionId(positions[0]?.id || null);
          setErrors({});
          setIsSubmitted(true);

          if (fileInputRef.current) {
            fileInputRef.current.value = null;
          }

          onUserRegistered();
        } else {
          alert("Registration failed: " + result.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("Registration failed: user with this email or phone already exists.");
        } else {
          alert("Registration error occurred. Try again later.");
        }
      }
    }
  };


  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.photo !== null &&
    positionId !== null &&
    Object.keys(errors).length === 0;

  return {
    positions,
    positionId,
    errors,
    formData,
    isFormValid,
    fileInputRef,
    isSubmitted,
    handleChange,
    handlePositionChange,
    handleSubmit,
  };
}