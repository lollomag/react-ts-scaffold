import { Container, Typography } from "@mui/material";
import ContactConfiguration from '../../../configurations/Contact/contact.json'
import { registerSchema } from "../../../configurations/Contact/ContactSchema";
import FormCmp from "@components/Form";


const Contacts = () => {

  const submitForm = (formObject:any) => {
    console.log('form page', formObject);
  }

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h3" component="h1">Accedi</Typography>
        <FormCmp 
          formInputs={ContactConfiguration.formInputs}
          formSchema={registerSchema}
          onFormSubmit={submitForm}
        />
      </Container>
    </>
  );
};

export default Contacts;
