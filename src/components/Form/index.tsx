import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";

interface FormCmpInterface {
  formInputs?: any;
  formSchema?: any;
  onFormSubmit?: (formObject: any) => void;
}

const FormCmp: React.FC<FormCmpInterface> = ({ formInputs, formSchema, onFormSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [object, setObject] = useState<any>('');

  const handleChange = (id: string, event: SelectChangeEvent) => {
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
    <Box sx={{ maxWidth: '30rem' }}>
      <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
        Register
      </Typography>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          sx={{ mb: 2 }}
          label='Name'
          fullWidth
          required
          error={!!errors['name']}
          helperText={`${errors['name'] ? errors['name'].message : ''}`}
          {...register('name')}
        />
        <TextField
          sx={{ mb: 2 }}
          label='Email'
          fullWidth
          required
          type='email'
          error={!!errors['email']}
          helperText={`${errors['email'] ? errors['email'].message : ''}`}
          {...register('email')}
        />
        <FormControl required sx={{ mb: 2 }} error={!!errors['gender']} {...register('gender')}>
          <FormLabel id="demo-radio-buttons-group-label" sx={{color: 'white'}}>Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={(event) => handleChange('gender', event)}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          {errors && errors['gender'] && <FormHelperText>{`${errors['gender'].message}`}</FormHelperText>}
        </FormControl>
        <FormControl required fullWidth sx={{ mb: 2 }} error={!!errors['age']} {...register('age')}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={object && object['age']}
            label="Age"
            onChange={(event) => handleChange('age', event)}
          >
            <MenuItem value={'10'}>Ten</MenuItem>
            <MenuItem value={'20'}>Twenty</MenuItem>
            <MenuItem value={'30'}>Thirty</MenuItem>
          </Select>
          {errors && errors['age'] && <FormHelperText>{`${errors['age'].message}`}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors['height']} {...register('height')}>
          <InputLabel id="demo-simple-select-label">Height</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={object && object['height']}
            label="Height"
            onChange={(event) => handleChange('height', event)}
          >
            <MenuItem value={'10'}>10</MenuItem>
            <MenuItem value={'20'}>20</MenuItem>
            <MenuItem value={'30'}>30</MenuItem>
          </Select>
          {errors && errors['height'] && <FormHelperText>{`${errors['height'].message}`}</FormHelperText>}
        </FormControl>
        <TextField
          sx={{ mb: 2 }}
          label='Password'
          fullWidth
          required
          type='password'
          error={!!errors['password']}
          helperText={`${errors['password'] ? errors['password'].message : ''}`}
          {...register('password')}
        />
        <TextField
          sx={{ mb: 2 }}
          label='Confirm Password'
          fullWidth
          required
          type='password'
          error={!!errors['passwordConfirm']}
          helperText={`${errors['passwordConfirm'] ? errors['passwordConfirm'].message : ''}`}
          {...register('passwordConfirm')}
        />

        <FormGroup>
          <FormControlLabel
            control={<Checkbox required />}
            {...register('terms')}
            label={
              <Typography color={errors['terms'] ? 'error' : 'inherit'}>
                Accept Terms and Conditions
              </Typography>
            }
          />
          <FormHelperText error={!!errors['terms']}>
            {`${errors['terms'] ? errors['terms'].message : ''}`}
          </FormHelperText>
        </FormGroup>

        <LoadingButton
          variant='contained'
          fullWidth
          type='submit'
          loading={loading}
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Register
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default FormCmp;
