import React, { useEffect, useState } from 'react'
import { DashHeader } from '../../components/dashboard/DashHeader'
import { DashTitle } from './../../components/dashboard/DashTitle';
import { SimpleInput } from '../../components/dashboard/SimpleInput';
import { Dialog } from '../../components/dialogs/Dialog';
import { BedDouble, BriefcaseBusiness, ChefHat, Dumbbell, Forklift, HardHat, Martini, Shirt } from 'lucide-react';
import { GuiSelect } from '../../components/gui/GuiSelect';
import { GuiOption } from './../../components/gui/GuiOption';
import { useNavigate } from 'react-router-dom';
import { validateInput } from './../../utils/validators';
import { TopMessage } from './../../components/dashboard/TopMessage';
import { ButtonMain } from '../../components/gui/ButtonMain';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import config from '../../config';

const BusinessType = {
  1: ['Restaurante', <ChefHat size={20} />],
  2: ['Construcción', <HardHat size={20} />],
  3: ['Logística', <Forklift size={20} />],
  4: ['Hotelería', <BedDouble size={20} />],
  5: ['Bar / Licorería', <Martini size={20} />],
  6: ['Gimnasio', <Dumbbell size={20} />],
  7: ['Retail', <Shirt size={20} />],
  8: ['Otro', ""]
}

export const DashboardBusiness = () => {
  const { user, setUser, login } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState(user.business?.name || "");
  const [businessType, setBusinessType] = useState(user.business?.industry || "8");
  const [address, setAddress] = useState(user.business?.address || "");

  const [newBusinessName, setNewBusinessName] = useState(businessName);
  const [newBusinessType, setNewBusinessType] = useState(businessType);
  const [newAddress, setNewAddress] = useState(address);

  const [hasChanges, setHasChanges] = useState(false);

  // Detectar cambios
  // useEffect(() => {
  //   const changed =
  //     businessName !== newBusinessName ||
  //     businessType !== newBusinessType ||
  //     address !== newAddress;
  //   setHasChanges(changed);
  // }, [businessName, businessType, address, newBusinessName, newBusinessType, newAddress]);

  //  useEffect(() => { setNewBusinessName(businessName); }, [businessName]);
  // useEffect(() => { setNewBusinessType(businessType); }, [businessType]);
  // useEffect(() => { setNewAddress(address); }, [address]);

  // Validación
  const validateInputs = () => {
    if (!newBusinessName.trim()) {
      setError('El nombre del negocio no puede estar vacío.');
      return false;
    }
    if (!newAddress.trim()) {
      setError('La dirección del negocio no puede estar vacía.');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    if (!validateInputs()) return;

    setLoading(true);
    try {

      const response = await axios.patch(`${config.backend}/business/${user.business?.id}`, {
        name: businessName,
        industry: businessType,
        address: address
      });

      if (response.status === 200) {
        const { user: updatedBusiness, token: newToken } = response.data;
        setBusinessName(updatedBusiness.name);
        setUser({... user, business: updatedBusiness})
      }

      // await new Promise(resolve => setTimeout(resolve, 1000));

      setBusinessName(newBusinessName);
      setBusinessType(newBusinessType);
      setAddress(newAddress);
      setSuccess('Cambios guardados correctamente.');
    } catch (err) {
      console.log(err)
      if (err.response?.data) {
        setError(err.response.data); // Si el backend envía un mensaje claro, ej: "El email ya está en uso"
      } else {
        setError('Ocurrió un error al actualizar los datos');
      }
    } finally {
      setLoading(false);
      setHasChanges(false);

    }
  };

  const handleCancel = () => {
    const data = user.business;
    setBusinessName(data?.name || "");
    setNewBusinessName(data?.name || "");

    setBusinessType(data?.industry || "8");
    setNewBusinessType(data?.industry || "8");

    setAddress(data?.address || "");
    setNewAddress(data?.address || "");

    setError('');
    setSuccess('');
    setHasChanges(false);
  };



  return (
    <div>
      <DashHeader title="Mi negocio" />
      <div className="p-8 max-w-2xl">
        <DashTitle title="Acerca de">
          Aquí puedes configurar tu negocio.
        </DashTitle>

        {success && <TopMessage message={success} type="success" onClose={() => setSuccess('')} />}
        {error && <TopMessage message={error} type="error" onClose={() => setError('')} />}

        {/* Nombre del negocio */}
        <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
          <div className="space-y-1">
            <label className="font-medium text-base text-slate-800 mb-1 block">Nombre del negocio</label>
            <p className="text-slate-500 font-medium w-full middle:w-sm text-sm py-2 mt-1 rounded-md">{businessName || "Sin especificar"}</p>
          </div>
          <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
            <Dialog
              title="Editar nombre del negocio"
              onSave={() => {
                setBusinessName(newBusinessName);
                setHasChanges(true);
                return true;
              }}
              onCancel={() => setNewBusinessName(businessName)}
              triggerText='Cambiar'
              triggerClass='btn-text'
              canSave={validateInput(newBusinessName, businessName)}
            >

              <SimpleInput
                label="Nombre comercial"
                placeholder="Ingresa tu nuevo nombre"
                value={newBusinessName}
                onChange={(e) => setNewBusinessName(e.target.value)}
              />

            </Dialog>
          </div>
        </div>

        {/* Tipo de negocio */}
        <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
          <div className="space-y-1">
            <label className="font-medium text-base text-slate-800 mb-1 block">Tipo de negocio</label>
            <div className='flex items-center gap-2'>
              {BusinessType[businessType] ? BusinessType[businessType][1] : <BriefcaseBusiness size={24} />}
              <span className="text-slate-500 font-medium text-sm py-2">{BusinessType[businessType]?.[0] ?? 'Desconocido'}</span>
            </div>
          </div>
          <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
            <Dialog
              title="Editar tipo de negocio"
              onSave={() => {
                setBusinessType(newBusinessType)
                setHasChanges(true);
              }}
              onCancel={() => setNewBusinessType(businessType)}
              triggerText='Cambiar'
              triggerClass='btn-text'
              canSave={businessType !== newBusinessType ? false : true}
            >
              <p className='text-tiny text-neutral-800 mb-4'>El tipo de negocio puede activar o desactivar algunas características. Escoge el que más se adapte a ti.</p>
              <GuiSelect
                placeholder={BusinessType[businessType][0] ?? 'Selecciona un tipo'}
                value={newBusinessType}
                onChange={(e) => setNewBusinessType(e)}
              >
                {Object.entries(BusinessType).map(([key, [label, icon]]) => (
                  <GuiOption key={key} value={key}>
                    {icon} {label}
                  </GuiOption>
                ))}
              </GuiSelect>
            </Dialog>
          </div>
        </div>

        {/* Dirección */}
        <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
          <div className="space-y-1">
            <label className="font-medium text-base text-slate-800 mb-1 block">Dirección del negocio</label>
            <p className="text-slate-500 font-medium w-full middle:w-sm text-sm py-2 mt-1 rounded-md">{address || "Sin especificar"}</p>
          </div>
          <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
            <Dialog
              title="Editar dirección del negocio"
              onSave={() => {
                setHasChanges(true);
                setAddress(newAddress);
                return true;
              }}
              onCancel={() => setNewAddress(address)}
              triggerText='Cambiar'
              triggerClass='btn-text'
              canSave={validateInput(newAddress, address)}
            >
              <SimpleInput
                label="Dirección comercial"
                placeholder="Ingresa tu nueva dirección"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </Dialog>
          </div>
        </div>

        {/* Acciones */}
        {hasChanges && (
          <div className='my-8'>
            <p className='mb-4 text-tiny text-slate-700 font-medium'>Se han modificado datos que aún no han sido sincronizados.</p>
            <div className='flex gap-2'>

              <ButtonMain
                className='w-24'
                loading={loading}
                onClick={handleSave}
              >
                Guardar
              </ButtonMain>
              <button className='btn-secondary' onClick={handleCancel}>Cancelar</button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
