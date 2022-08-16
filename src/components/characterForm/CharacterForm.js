import './CharacterForm.scss';
import {Link} from 'react-router-dom';
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
    let searchResponse
    if (char && char.length > 0) {
        searchResponse = <div className="char__form__input-group">
            <div>
                Here is {char[0].name} page. Visit it.
            </div>
            <Link to={`character/${char[0].id}`}>
                <button className="button button__main">
                    <div className="inner">
                        Visit
                    </div>
                </button>
            </Link>
        </div>
    } else if (char) {
        searchResponse = <div className="char__form__error">The character was not found. Check the name and try again</div>
    } else {
        searchResponse = null
    }
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
            <Form className="char__form">
                <label className="char__form__label" htmlFor="name">Or find a character by name:</label>
                <div className="char__form__input-group">
                    <Field 
                        placeholder="Enter Name"
                        className="char__form__input"
                        onKeyUp={(e) => e.key === 'enter' ? null : setChar(null)}
                        name="name" 
                        type="text" />
                    <button className="button button__main" type="submit">
                        <div className="inner">
                            Submit
                        </div>
                    </button>
                </div>
                <ErrorMessage 
                    className="char__form__error"
                    component={"div"} 
                    name="name" />
                {searchResponse}
            </Form>
        </Formik>
    )
}

export default CharacterForm