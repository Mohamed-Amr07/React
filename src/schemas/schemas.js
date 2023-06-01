import * as Yup from 'yup'

const category = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('category name is Required'),
});
const FILE_SIZE = 1024 * 1024 ;
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png"
];
const book = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('first name is Required'),
    category: Yup.string()
        .required('category is Required'),
    author: Yup.string()
        .required('author is Required'),
    image: Yup.mixed()
        .required("Image is required")
        .test(
            "FILE_SIZE",
            "File too large",
            value => value && value.size <= FILE_SIZE
        )
        .test(
            "FILE_FORMAT",
            "Unsupported Format",
            value => value && SUPPORTED_FORMATS.includes(value.type)
        ),

});

const author = Yup.object().shape({
    firstname: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('first name is Required'),
    lastname: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('last name is Required'),
    date_of_birth: Yup.date()
        .required('date of birth  is Required'),
    image: Yup.mixed()
        .required("Image is required")
        .test(
            "fileSize",
            "File too large",
            value => value && value.size <= FILE_SIZE
        )
        .test(
            "fileFormat",
            "Unsupported Format",
            value => value && SUPPORTED_FORMATS.includes(value.type)
        ),

});
const schema = { author, book, category }
export default schema;