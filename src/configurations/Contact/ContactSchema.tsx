import { email, endsWith, minLength, object, string } from "valibot";

export const LoginSchema = object({
  email: string('Inserisci la tua mail', [
    email('The email address is badly formatted.'),
    endsWith('.com', 'La password deve terminare con .com'),
  ]),
  password: string('Inserisci la password', [
    minLength(8, 'La password deve contenere almeno 8 caratteri'),
  ]),
});