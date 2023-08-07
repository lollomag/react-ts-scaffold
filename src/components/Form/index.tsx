import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ButtonCmp from "@components/ButtonCmp/ButtonCmp";

interface FormCmpInterface {
  formInputs: any;
  Form: any;
  Field?: any;
  onFormSubmit?: (formObject: any) => void;
}

const FormCmp: React.FC<FormCmpInterface> = ({ formInputs, Form, Field, onFormSubmit }) => {
  const handleSubmit = (values: any) => {
    onFormSubmit && onFormSubmit(values)
  };

  return (
    <Form onSubmit={handleSubmit}>
      {formInputs.map((input: any) => {
        switch (input.component) {
          case 'input':
            return <Field name={input.key} key={input.key}>
              {(field: any, props: any) => {
                return <>
                  <TextField InputProps={{ ...props }} required={input.required} type={input.inputType} error={!!field.error.value} helperText={field.error} sx={{ width: '100%' }} label={input.label} placeholder={input.placeholder} />
                </>
              }}
            </Field>
            break;
          case 'select':
            return <Field name={input.key} key={input.key}>
              {(field: any, props: any) => (

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={field.value.value || ''}
                    label="Age"
                    MenuProps={{...props}}
                    onChange={({target}) => {return target.value}}
                  >
                    {[
                      { label: 'Preact', value: 'preact' },
                      { label: 'Solid', value: 'solid' },
                      { label: 'Qwik', value: 'qwik' },
                    ].map(({ label, value }) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Field>

            break;

          default:
            break;
        }
      })}
      <ButtonCmp title="invia" type="submit" />
    </Form>
  );
};

export default FormCmp;
