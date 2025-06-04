import React, { useEffect, useState } from 'react'
import { DashHeader } from '../../components/dashboard/DashHeader'
import { DashTitle } from './../../components/dashboard/DashTitle';
import { SimpleInput } from '../../components/dashboard/SimpleInput';
import { DialogExample } from '../../components/dialogs/DialogExample';
import { Dialog } from '../../components/dialogs/Dialog';
import { BedDouble, BriefcaseBusiness, ChefHat, Dumbbell, Forklift, HardHat, Martini, Shirt } from 'lucide-react';
import { GuiSelect } from '../../components/gui/GuiSelect';
import { GuiOption } from './../../components/gui/GuiOption';
import MuiBaseSelect from './../../components/MuiBase';
const SelectTo = () => {
  return (
    <select className="select-to">
      <option value="business">Negocio</option>
      <option value="personal">Personal</option>
    </select>
  )
}

const BusinessType = {
  1: ['Restaurante', <ChefHat size={20}/>],
  2: ['Construcción', <HardHat size={20}/>],
  3: ['Logística', <Forklift size={20}/>],
  4: ['Hotelería', <BedDouble size={20}/>],
  5: ['Bar / Licorería', <Martini size={20}/>],
  6: ['Gimnasio', <Dumbbell size={20}/>],
  7: ['Retail', <Shirt size={20}/>],
  8: ['Otro', ""]
}

export const DashboardBusiness = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState('');

  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState(email);

  const [businessName, setBusinessName] = useState('BestShop');
  const [newBusinessName, setNewBusinessName] = useState(businessName);
  
  const [businessType, setBusinessType] = useState("1");
  const [newBusinessType, setNewBusinessType] = useState(businessType);

  const [address, setAddress] = useState('Av');
  const [newAddress, setNewAddress] = useState(address);


  useEffect(() => { setNewBusinessName(businessName); }, [businessName]);
  useEffect(() => { setNewBusinessType(businessType); }, [businessType]);
  useEffect(() => { setNewAddress(address); }, [address]);

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
  }

  const handleCancel = () => {
    setEditMode('');
    setError('');
    setSuccess('');
    setNewEmail(email);
  };

  const handleSave2 = () => {
    setBusinessName(newBusinessName);
  };

  return (
    <div>
      <DashHeader title="Mi negocio" />
      <div className="p-8 max-w-2xl">
        <DashTitle title="Acerca de">
          Aquí puedes configurar las opciones de tu panel de control.
        </DashTitle>

        {/* Nombre del negocio */}
        <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
          <div className="space-y-1">
            <label className="font-medium text-base text-slate-800 mb-1 block">Nombre del negocio</label>
            <p className="text-slate-700 font-medium w-full middle:w-sm text-sm py-2 mt-1 rounded-md">{businessName}</p>

          </div>

          <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
            <Dialog
              title="Editar nombre del negocio"
              onSave={() => setBusinessName(newBusinessName)}
              onCancel={() => setNewBusinessName(businessName)}
              triggerText='Actualizar'
              triggerClass='btn-text'
            >
              <p className="mb-4 text-tiny">Este es el contenido del diálogo.</p>
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
              <span className="text-slate-700 font-medium text-sm py-2">{BusinessType[businessType] ? BusinessType[businessType][0] : 'Desconocido'}</span>
            </div>


          </div>

          <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
            <Dialog
              title="Editar tipo de negocio"
              onSave={() => setBusinessType(newBusinessType)}
              onCancel={() => setNewBusinessType(businessType)}
              triggerText='Actualizar'
              triggerClass='btn-text'
            >
              <p className="mb-4 text-tiny text-neutral-800">El tipo de negocio puede habilitar o deshabilitar algunas características. Selecciona el que más se acomode a tu negocio.</p>
              <GuiSelect
                placeholder={BusinessType[businessType][0] ? BusinessType[businessType][0] : 'Selecciona un tipo'}
                value={newBusinessType}
                onChange={(e) => setNewBusinessType(e)}
              >
                {Object.entries(BusinessType).map(([key, [label, icon]]) => (
                  <GuiOption key={key} value={key}>
                    {icon} {label}
                  </GuiOption>
                ))}
              </GuiSelect>
              
              
              {/* <SimpleInput
                label="Nombre comercial"
                placeholder="Ingresa tu nuevo nombre"
                value={newBusinessName}
                onChange={(e) => setNewBusinessName(e.target.value)}
              /> */}
            </Dialog>
          </div>
        </div>

        {/* Dirección */}
        <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
          <div className="space-y-1">
            <label className="font-medium text-base text-slate-800 mb-1 block">Dirección del negocio</label>
            <p className="text-slate-700 font-medium w-full middle:w-sm text-sm py-2 mt-1 rounded-md">{address}</p>

          </div>

          <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
            <Dialog
              title="Editar dirección del negocio"
              onSave={() => setAddress(newAddress)}
              onCancel={() => setNewAddress(address)}
              triggerText='Actualizar'
              triggerClass='btn-text'
            >
              <p className="mb-4 text-tiny">Este es el contenido del diálogo.</p>
              <SimpleInput
                label="Dirección comercial"
                placeholder="Ingresa tu nuevo dirección"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </Dialog>
          </div>
        </div>

      </div>

    </div>
  )
}
