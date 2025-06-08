import React, { useState } from 'react';
import { SimpleInput } from './../../components/dashboard/SimpleInput';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import config from '../../config';
import { AuthError } from './../../components/auth/AuthError';
import { AuthCheck } from '../../components/auth/AuthCheck';
import { TopMessage } from '../../components/dashboard/TopMessage';
import { DashHeader } from './../../components/dashboard/DashHeader';
import { DashTitle } from '../../components/dashboard/DashTitle';
import { Dialog } from './../../components/dialogs/Dialog';
import { useNavigate } from 'react-router-dom';

export const DashboardSettings = () => {
  const { user, setUser, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(user.email);
  const [newEmail, setNewEmail] = useState(email);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState('');

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (editMode === 'email') {
        if (!newEmail.includes('@') || !newEmail.includes('.')) {
          setError('Correo inválido');
        } else {
          const response = await axios.patch(`${config.backend}/users/${user.id}`, {
            email: newEmail
          });

          if (response.status === 200) {
            const { user: updatedUser, token: newToken } = response.data;
            localStorage.setItem("token", newToken);
            login(newToken);

            setEmail(updatedUser.email);
            //setUser(prev => ({ ...prev, email: newEmail }));
            setSuccess('Correo actualizado correctamente');
            setEditMode('');
          }
        }
      }

      if (editMode === 'password') {
        if (password.length < 6) {
          setError('La contraseña debe tener al menos 6 caracteres');
        } else if (password !== confirmPassword) {
          setError('Las contraseñas no coinciden');
        } else {
          const response = await axios.patch(`${config.backend}/users/${user.id}`, {
            password: password
          });

          if (response.status === 200) {
            setSuccess('Contraseña actualizada correctamente');
            setPassword('');
            setConfirmPassword('');
            setEditMode('');
          }
        }
      }
    } catch (err) {
      console.error(err);

      if (err.response?.data) {
        setError(err.response.data); 
      } else {
        setError('Ocurrió un error al actualizar los datos');
      }
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setEditMode('');
    setError('');
    setSuccess('');
    setNewEmail(email);
    setPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = async () => {
    return (
          <Dialog
              title="Eliminar cuenta"
              onSave={handleDeleteAccount}
              onCancel={() => { return "true" }}
              triggerText='Eliminar'
              triggerClass='btn-text text-red-500!'
              canSave={false}
            >
              <p className='text-tiny text-neutral-800'>¿Estás seguro de eliminar la cuenta? Esta acción no se puede deshacer.</p>
            </Dialog>
        )
    try {
      const response = await axios.delete(`${config.backend}/users/${user.id}`, {
        id: user.id
      });

      if (response.status === 204) {
        
        setSuccess('Se ha eliminado correctamente');
        navigate("/logout")
      }
    }
    catch (err) {
      if (err.response?.data) {
        setError(err.response.data); 
      } else {
        setError('Ocurrió un error al actualizar los datos');
      }
    }

  }

  return (
    <div className='relative overflow-hidden'>
      <DashHeader title="Cuenta" />

      {/* <TopMessage message={success} /> */}
      {success && <TopMessage message={success} type="success" onClose={() => setSuccess('')} />}
      {error && <TopMessage message={error} type="error" onClose={() => setError('')} />}


      <div className="p-8 max-w-2xl">
        <DashTitle title="Ajustes">
          Aquí puedes configurar las opciones de tu panel de control.
        </DashTitle>

        {/* Campo de correo electrónico */}
        <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
          <div className="space-y-1">
            <SimpleInput
              label="Correo electrónico"
              readOnly={editMode !== 'email'}
              onChange={(e) => setNewEmail(e.target.value)}
              value={newEmail}
              placeholder="Ingresa tu nuevo correo electrónico"
              error={error && editMode === 'email'}
            />
          </div>

          <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
            {editMode === 'email' ? (
              <>
                <button className="btn-text" onClick={handleSave} disabled={loading} >Guardar</button>
                <button className="btn-text muted" onClick={handleCancel} disabled={loading} >Cancelar</button>
              </>
            ) : (
              <button className="btn-text" onClick={() => setEditMode('email')} >
                Actualizar
              </button>
            )}
          </div>
        </div>

        {/* Campo de contraseña */}
        <div className={"mt-6 border-b border-gray-200 pb-4 flex gap-4 " + (editMode === 'password' ? 'flex-col ' : 'flex-col middle:flex-row middle:justify-between middle:items-center')} >
          <h3 className="font-medium text-base">Contraseña</h3>

          {editMode === 'password' ? (
            <>
              <SimpleInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nueva contraseña"
                autoComplete="new-password"
                error={error && editMode === 'password'}
              />

              <SimpleInput
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar contraseña"
                autoComplete="new-password"
                error={error && editMode === 'password'}

              />

              <div className="flex gap-4 mt-2">
                <button
                  className="btn-text"
                  onClick={handleSave}
                  disabled={loading}
                >
                  Guardar
                </button>
                <button
                  className="btn-text muted"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <div>
              <button
                className="btn-text"
                onClick={() => setEditMode('password')}
              >
                Actualizar
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
          <label className="font-medium text-base text-slate-800 mb-1 block">Mi cuenta</label>
          <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
            <Dialog
              title="Eliminar cuenta"
              onSave={handleDeleteAccount}
              onCancel={() => { return "true" }}
              triggerText='Eliminar'
              triggerClass='btn-text text-red-500!'
              canSave={false}
            >
              <p className='text-tiny text-neutral-800'>¿Estás seguro de eliminar la cuenta? Esta acción no se puede deshacer.</p>
            </Dialog>
          </div>
        </div>

      </div>
    </div>
  );
};
