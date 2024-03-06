import Contact from "../models/Contact.js";

export const getAllContacts = () => Contact.find();

export const getContactsByFilter = (filter, query = {}) => Contact.find(filter, "-createdAt -updatedAt", query); // skip - how much obj to skip

export const getContactsCountByFilter = (filter) => Contact.countDocuments(filter); // returns the number

export function getContactById(contactId) {
  return Contact.findById(contactId);
}

export const getOneContactByFilter = (filter) => Contact.findOne(filter);

export function removeContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export const deleteContactByFilter = (filter) => Contact.findOneAndDelete(filter);

export const addContact = (data) => Contact.create(data);

export const updateContactById = (id, data) => Contact.findByIdAndUpdate(id, data);

export const updateContactByFilter = (filter, data) => Contact.findOneAndUpdate(filter, data);

export const updateStatus = (id, data) => Contact.findByIdAndUpdate(id, data, { new: true, runValidators: false });

export const updateStatusByFilter = (filter, data) => {
  console.log("filter", filter);
  return Contact.findOneAndUpdate(filter, data, { new: true, runValidators: false });
};
