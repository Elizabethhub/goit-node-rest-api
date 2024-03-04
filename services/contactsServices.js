import Contact from "../models/Contact.js";

export const getAllContacts = () => Contact.find();

export function getContactById(contactId) {
  return Contact.findById(contactId);
}

export function removeContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export const addContact = (data) => Contact.create(data);

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data);

export const updateStatus = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: false });
