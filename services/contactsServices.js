import Contact from "../models/Contact.js";

export const getAllContacts = () => Contact.find();
//   Contact.find(
//     {
//       favorite: true, // search criterias
//     },
//     "-name -phone" // what fields we want to get from db or "-name -phone" for exception
//   );

export function getContactById(contactId) {
  return Contact.findById(contactId); // finds first match or null
  //   return Contact.findOne({ _id: contactId }); // finds first match or null
}

export function removeContact(contactId) {
  //   return Contact.findByIdAndRemove(id);
  return Contact.findByIdAndDelete(contactId); // delete by id or return null
}

export const addContact = (data) => Contact.create(data);

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data); // by default returns old obj if {new: true} isn't added
// runValidators - to run scheme validation during update
