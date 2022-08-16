import './CharacterForm.scss';
import {useState} from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import useMarvelService from '..//../services/MarvelService';

const CharacterForm = () => {
    const {getCharacterByName} = useMarvelService()
    const [char, setChar] = useState(null)
    const updateChar = ({name}, actions) => {
        getCharacterByName(name)
            .then(setChar)
        actions.resetForm()
    }
    console.log(char)
    return (
        <Formik
            initialValues={{
                name: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Must be 2 characters or more')
                    .required('Required')
            })}
            onSubmit={updateChar}
        >
            <Form>
                <Field name="name" type="text" />
                <button type="submit">Submit</button>
                <ErrorMessage component={"div"} name="name" />
            </Form>
        </Formik>
    )
}

export default CharacterForm