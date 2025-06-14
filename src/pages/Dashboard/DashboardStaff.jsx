import React, { useEffect, useState } from 'react'
import { DashHeader } from '../../components/dashboard/DashHeader'
import { DashTitle } from '../../components/dashboard/DashTitle'
import { ButtonMain } from '../../components/gui/ButtonMain'
import { IdCard, Plus, UsersRound } from 'lucide-react';
import { Dialog } from '../../components/dialogs/Dialog';
import { SimpleInput } from '../../components/dashboard/SimpleInput';
import { GuiSelect } from '../../components/gui/GuiSelect';
import { GuiOption } from '../../components/gui/GuiOption';
import { generatePassword } from './../../utils/random';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import config from '../../config';
import { LoadingSection } from './../../components/LoadingSection';
import { isValidEmail } from '../../utils/validators';
import { TopMessage } from '../../components/dashboard/TopMessage';


const RoleType = {
  'GUEST': ['Invitado', 'Acceso limitado, solo lectura o revisión parcial del sistema.'],
  'USER': ['Usuario', 'Ejecuta tareas asignadas como entradas, salidas y movimientos.'],
  'MOD': ['Moderador', 'Supervisa y gestiona contenidos, acciones básicas de usuarios.'],
  'ADMIN': ['Administrador', 'Control total del sistema, usuarios, configuraciones y permisos.'],
}


export const DashboardStaff = () => {

  const { token, user } = useAuth();
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // User data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');
  const [hash, setHash] = useState('');

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);


  useEffect(() => {
    fetch(`${config.backend}/business/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setStaff(data.filter(u => u.id !== user.id));
        setLoading(false);
      })
  }, []);



  const handleSave = async () => {
    setActionLoading(true);

    try {
      const response = await axios.post(`${config.backend}/business/staff/create`, {
        name: name,
        email: email,
        password: hash,
        role: role
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setStaff([...staff, response.data])
      setSuccess('Usuario creado correctamente.');

    }
    catch (err) {
      const errorMsg = err.response?.data || err.message;
      if (errorMsg) {
        setError(errorMsg);
      } else {
        setError('Ocurrió un error al actualizar los datos');
      }
    }
    finally {
      setActionLoading(false);
    }
  }

  const handleCancel = () => {
    setName("");
    setEmail("");
    setRole("USER");
  }

  const handleSubmit = async () => {

  }

  const handleToggleUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const isSelected = (userId) => selectedUsers.includes(userId);

  const validateInputs = () => {
    if (!name.trim()) return "El nombre es obligatorio"
    if (name.length < 3) return "El nombre debe tener al menos 3 caracteres."

    if (!email.trim()) return "El correo eléctronico es obligatorio";
    if (!isValidEmail(email)) return "Correo eléctrónico inválido.";

    if (!role) return "El rol es obligatorio";
    return false;
  }


  return (
    <div className='relative overflow-hidden'>
      <DashHeader title="Personal" />

      <LoadingSection loading={loading}>
        <div className="p-8 ">
          {/* <DashTitle title="Agrega artículos y servicios">
          Aquí puedes configurar las opciones de tu panel de control.
        </DashTitle> */}

          {success && <TopMessage message={success} type="success" onClose={() => setSuccess('')} />}
          {error && <TopMessage message={error} type="error" onClose={() => setError('')} />}

          <div>
            <div className='flex justify-between items-center py-4'>
              <h3 className='text-xl font-semibold'>Personal</h3>

              <Dialog
                title="Agregar nuevo empleado"
                onSave={handleSave}
                onCancel={handleCancel}
                triggerText='Agregar nuevo'
                triggerClass='btn-main flex text-tiny! gap-2'
                triggerIcon={<Plus />}
                triggerClick={() => setHash(generatePassword(6))}
                canSave={validateInputs()}
                loading={actionLoading}
              >
                <div className='mb-6'>
                  <SimpleInput
                    label="Nombre"
                    placeholder="Ingresa el nombre"
                    className="mb-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='mb-6'>
                  <SimpleInput
                    label="Correo electrónico"
                    placeholder="Ingresa tu nueva dirección"
                    className="mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='mb-6'>
                  <label className="font-medium text-base text-slate-800 mb-1 block">Rol</label>
                  <GuiSelect
                    value={role}
                    placeholder={RoleType[role][0] ?? 'Selecciona un tipo'}
                    onChange={(e) => setRole(e)}
                    className="mb-4"
                  >
                    {Object.entries(RoleType).map(([key, [label]]) => (
                      <GuiOption key={key} value={key}>{label}</GuiOption>
                    ))}

                  </GuiSelect>
                  <p className='px-1 text-sm text-neutral-600 leading-snug'>{RoleType[role][1] || 's'}</p>
                </div>

                <div className='mb-6'>
                  <SimpleInput
                    label="Contraseña temporal"
                    placeholder="Ingresa tu nueva dirección"
                    value={hash}
                    className="mb-4"
                    disabled={true}
                  // value={newAddress}
                  // onChange={(e) => setNewAddress(e.target.value)}
                  />
                  <p className='px-1 text-sm text-neutral-600 leading-snug'>Esta debe ser cambiada una vez iniciada la sesión.</p>
                </div>

              </Dialog>
            </div>
          </div>


          {/* Tabla de empleados */}
          {staff.length > 0 ? (
            <div className="relative">
              <div className="flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
                  >
                    <span className="sr-only">Action button</span>
                    Action
                    <svg className="w-2.5 h-2.5 ms-2.5" fill="none" viewBox="0 0 10 6">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
                      <ul className="py-1 text-sm text-gray-700">
                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Reward</a></li>
                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Promote</a></li>
                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Activate account</a></li>
                      </ul>
                      <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete User</a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 20 20">
                      <path d="M19 19l-4-4M15 8a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search-users"
                    className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-0"
                    placeholder="Search for users"
                  />
                </div>
              </div>

              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="p-4">
                      <div className="flex items-center">
                        {/* Puedes implementar el "select all" si lo deseas */}
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSelectedUsers(checked ? staff.map(u => u.id) : []);
                          }}
                          checked={selectedUsers.length === staff.length}
                        />
                        <label htmlFor="checkbox-all-search" className="sr-only">Select all</label>
                      </div>
                    </th>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Función</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.length > 0 && staff.map(user => (
                    <UserRow
                      key={user.id}
                      user={user}
                      isChecked={isSelected(user.id)}
                      onToggle={() => handleToggleUser(user.id)}
                    />
                  ))}
                </tbody>
              </table>

            </div>
          ) : (
            <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center text-neutral-600 h-48 gap-4">
              <UsersRound className="size-10" />
              <h2 className='text-2xl font-medium font-app'>Aún no tienes personal</h2>
              <p>Agrega miembros para comenzar a construir tu equipo.</p>
            </div>
          )}

        </div>
      </LoadingSection>
    </div>
  )
}

const UserRow = ({ user, isChecked, onToggle }) => (
  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
    <td className="w-4 p-4">
      <div className="flex items-center">
        <input
          id={`checkbox-${user.id}`}
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor={`checkbox-${user.id}`} className="sr-only">Seleccionar</label>
      </div>
    </td>
    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
      <img className="w-10 h-10 rounded-full" src={user.avatar || "https://i.pinimg.com/474x/2b/da/51/2bda51ca60cc3b5daaa8e062eb880430.jpg"} alt={`${user.name} image`} />
      <div className="ps-3">
        <div className="text-base font-semibold">{user.name}</div>
        <div className="font-normal text-gray-500">{user.email}</div>
      </div>
    </th>
    <td className="px-6 py-4">{RoleType[user.role][0] || "???"}</td>
    <td className="px-6 py-4">
      <div className="flex items-center">
        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
        {user.status || "Activo"}
      </div>
    </td>
    <td className="px-6 py-4">
      <a href="#" className="font-medium text-blue-600 hover:underline">Edit user</a>
    </td>
  </tr>
);
