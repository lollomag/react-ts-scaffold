import { Container, Typography } from "@mui/material";
import { useForm, valiForm } from '@modular-forms/react';
import ContactConfiguration from '../../../configurations/Contact/contact.json'
import { LoginSchema } from "../../../configurations/Contact/ContactSchema";
import { LoginFormTypes } from "../../../configurations/Contact/ContactType";
import FormCmp from "@components/Form";


const Contacts = () => {

  const [loginForm, { Form, Field }] = useForm<LoginFormTypes>({
    validate: valiForm(LoginSchema),
  });

  const submitForm = (formObject:any) => {
    console.log('form page', formObject);
  }

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h3" component="h1">Accedi</Typography>
        <FormCmp 
          formInputs={ContactConfiguration.formInputs}
          Form={Form}
          Field={Field}
          onFormSubmit={submitForm}
        />
      </Container>
    </>
  );
};

export default Contacts;
