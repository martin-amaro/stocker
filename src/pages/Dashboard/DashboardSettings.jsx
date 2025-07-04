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
import { isValidEmail } from './../../utils/validators';

export const DashboardSettings = () => {
  const { user, login, token } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(user.email);
  const [newEmail, setNewEmail] = useState(email);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState('');
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      let payload = {};
      let successMessage = '';
      let onSuccess = () => { };

      if (editMode === 'email') {
        if (!isValidEmail(newEmail)) {
          setError('Correo inválido');
          setLoading(false);
          return;
        }

        payload = { email: newEmail };
        successMessage = 'Correo actualizado correctamente';

        onSuccess = (updatedUser, newToken) => {
          localStorage.setItem("token", newToken);
          login(newToken);
          setEmail(updatedUser.email);
        };
      }

      if (editMode === 'password') {
        if (password.length < 6) {
          setError('La contraseña debe tener al menos 6 caracteres');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Las contraseñas no coinciden');
          setLoading(false);
          return;
        }

        payload = { password };
        successMessage = 'Contraseña actualizada correctamente';

        onSuccess = () => {
          setPassword('');
          setConfirmPassword('');
        };
      }

      if (!payload || Object.keys(payload).length === 0) {
        setLoading(false);
        return;
      }

      const response = await axios.patch(`${config.backend}/users/me`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        const { user: updatedUser, token: newToken } = response.data;

        onSuccess(updatedUser, newToken);
        setSuccess(successMessage);
        setEditMode('');
      }
    } catch (err) {
      console.error(err);

      if (err.response?.data) {
        const data = err.response.data;
        setError(typeof data === 'string' ? data : data?.error || 'Error desconocido');
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
    setDeleting(true);

    try {
      const response = await axios.delete(`${config.backend}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 204) {
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

        {/* Danger Zone */}
        <div className="mt-6 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
          <label className="font-medium text-base text-slate-800 mb-1 block">Mi cuenta</label>
          <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
            <Dialog
              title="Eliminar cuenta"
              onSave={handleDeleteAccount}
              loading={deleting}
              onCancel={() => { return "true" }}
              triggerText='Eliminar'
              triggerClass='btn-text text-red-500!'
              buttonText='Eliminar'
              buttonClass='btn-danger w-24'
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
