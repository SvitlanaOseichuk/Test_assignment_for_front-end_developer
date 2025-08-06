export function validateForm(data) {
  const errors = {};
  

  if (!data.name || data.name.trim().length < 2 || data.name.trim().length > 60) {
    errors.name = "Name must be between 2 and 60 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || data.email.length < 6 || data.email.length > 100) {
    errors.email = "Email must be between 6 and 100 characters";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Email is invalid";
  }

  const phoneRegex = /^\+?380\d{9}$/;
  if (!data.phone) {
    errors.phone = "Phone is required";
  } else if (!phoneRegex.test(data.phone)) {
    errors.phone = "Phone number is invalid";
  }

  if (!Number.isInteger(data.position_id) || data.position_id < 1) {
  errors.position_id = "Position is required";
  }

  if (data.photo) {
  const allowedTypes = ["image/jpeg", "image/jpg"];
  if (!allowedTypes.includes(data.photo.type)) {
    errors.photo = "Photo must be in JPEG/JPG format";
  }
  const maxSizeInBytes = 5 * 1024 * 1024;
  if (data.photo.size > maxSizeInBytes) {
    errors.photo = "Photo must be less than 5MB";
  }
}
  return errors;
}


export function validatePhotoDimensions(file) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (img.width < 70 || img.height < 70) {
        resolve("Photo must be at least 70x70 pixels");
      } else {
        resolve("");
      }
    };
    img.onerror = () => resolve("Invalid image file");
    img.src = URL.createObjectURL(file);
  });
}