import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import ButtonCmp from "@components/ButtonCmp/ButtonCmp";

interface FormCmpInterface {
  title?: string;
  formInputs?: any;
  formSchema?: any;
  onFormSubmit?: (formObject: any) => void;
}

const FormCmp: React.FC<FormCmpInterface> = ({ title, formInputs, formSchema, onFormSubmit }) => {
  const [object, setObject] = useState<any>('');

  const handleChange = (id: string, event: SelectChangeEvent) => {
    console.log('target', event.target.value);

    setValue(id, event.target.value, { shouldValidate: true })
  };

  type formInput = TypeOf<typeof formSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    watch,
    reset,
    handleSubmit,
    setValue
  } = useForm<formInput>({
    resolver: zodResolver(formSchema),
  });


  watch((object) => {
    console.log('popop', object);
    setObject(object)
  })


  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<formInput> = (values) => {
    onFormSubmit && onFormSubmit(values)
  };
  console.log('errors', errors);

  return (
    <Box>
      {title &&
        <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>{title}</Typography>
      }
      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Grid container spacing={2} sx={{ mt: 0 }}>
          {formInputs.map((input: any) => {
            switch (input.component) {
              case 'input':
                return <Grid item xs={4}>
                  <TextField
                    sx={{ mb: 2 }}
                    label={input.label}
                    fullWidth
                    required={input.required}
                    type={input.inputType}
                    error={!!errors[input.key]}
                    helperText={`${errors[input.key] ? errors[input.key]?.message : ''}`}
                    {...register(input.key)}
                  />
                </Grid>
              case 'select':
                return <Grid item xs={4}>
                  <FormControl required={input.required} fullWidth sx={{ mb: 2 }} error={!!errors[input.key]} {...register(input.key)}>
                    <InputLabel id="demo-simple-select-label">{input.label}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={object && object[input.key]}
                      label={input.label}
                      onChange={(event) => handleChange(input.key, event)}
                    >
                      {input.options.map((option: { value: string, label: string }) => (
                        <MenuItem value={option.value}>{option.label}</MenuItem>
                      ))}
                    </Select>
                    {errors && errors[input.key] && <FormHelperText>{`${errors[input.key]?.message}`}</FormHelperText>}
                  </FormControl>
                </Grid>
              case 'radio':
                return <Grid item xs={4}>
                  <FormControl required={input.required} sx={{ mb: 2 }} error={!!errors[input.key]}>
                    <FormLabel id="demo-radio-buttons-group-label" sx={{ color: 'white' }}>{input.label}</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(event) => handleChange(input.key, event)}
                      row
                    >
                      {input.options.map((option: { value: string, label: string }) => (
                        <FormControlLabel {...register(input.key)} value={option.value} control={<Radio />} label={option.label} />
                      ))}
                    </RadioGroup>
                    {errors && errors[input.key] && <FormHelperText>{`${errors[input.key]?.message}`}</FormHelperText>}
                  </FormControl>
                </Grid>
              case 'checkbox':
                return <Grid item xs={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox required={input.required} />}
                      {...register(input.key)}
                      label={
                        <Typography color={errors[input.key] ? 'error' : 'inherit'}>
                          {input.label}
                        </Typography>
                      }
                    />
                    <FormHelperText error={!!errors[input.key]}>
                      {`${errors[input.key] ? errors[input.key]?.message : ''}`}
                    </FormHelperText>
                  </FormGroup>
                </Grid>

              default:
                break;
            }
          })}
        </Grid>

        <ButtonCmp title="Invia" type="submit" />
      </Box>
    </Box>
  );
};

export default FormCmp;
