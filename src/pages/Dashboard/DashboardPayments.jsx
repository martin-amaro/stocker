import React, { useState, useEffect } from 'react'
import { CreditCard, FileText, Plus, Save, Search, Filter, DollarSign, Calendar, User, Building } from 'lucide-react';

// Muestra un encabezado con título y subtítulo.
export const DashHeader = ({title, subtitle}) => {
  return (
    <div className="w-full py-4 px-6 bg-blue-50 text-blue-600 font-semibold text-sm border-b border-blue-100">
      <div className="font-semibold">{title}</div>
      {subtitle && <div className="text-xs text-blue-500 mt-1">{subtitle}</div>}
    </div>
  )
}
 
// Muestra un título grande y un texto secundario.
export const DashTitle = ({title, children}) => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <p className="text-gray-600 mt-2">{children}</p>
   </>
  )
}

//Un input reutilizable con etiqueta, validación y estilos.
export const SimpleInput = ({ label, name, type, onChange, disabled, placeholder, error, readOnly, value, autoComplete='on'}) => {
  return (
    <div>
      {label && <label className="font-medium text-base text-slate-800 mb-1 block">{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={"text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md outline-blue-500" +
          (readOnly ? ' cursor-default outline-0 border-transparent text-neutral-500' : ' focus:outline-blue-500 ') +
          (error ? ' border-red-500 focus:border-red-500 bg-slate-300' : '')
        }
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck="false"
        autoComplete={autoComplete}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  )
}

// Muestra un mensaje flotante de éxito o error en la parte superior.
export const TopMessage = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (!message) return;

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!visible) return null;

  return (
    <div className='fixed top-0 left-0 right-0 z-50 animate-pulse shadow-md'>
      <div
        className={`h-full w-full p-4 text-sm text-white flex justify-center items-center gap-2 ${
          type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}
        role='alert'
      >
        <span className='font-medium'>{message}</span>
      </div>
    </div>
  );
};

// Componente principal para pagos y facturas
export const DashboardPayments = ({title = "Dashboard"}) => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  
  // Estados para formularios
  const [invoiceForm, setInvoiceForm] = useState({
    numero: '',
    cliente: '',
    email: '',
    telefono: '',
    direccion: '',
    concepto: '',
    subtotal: '',
    impuestos: '',
    descuento: '',
    fechaVencimiento: '',
    notas: ''
  });
  
  const [paymentForm, setPaymentForm] = useState({
    facturaNumero: '',
    monto: '',
    metodoPago: '',
    referencia: '',
    banco: '',
    fechaPago: '',
    comprobante: '',
    notas: ''
  });

  // Estados predefinidos
  const invoiceStatuses = ['Pendiente', 'Pagada', 'Vencida', 'Cancelada'];
  const paymentMethods = ['Efectivo', 'Transferencia', 'Tarjeta de Crédito', 'Tarjeta de Débito', 'Cheque', 'PayPal', 'Otros'];
  const banks = ['Bancolombia', 'Banco de Bogotá', 'Davivienda', 'BBVA', 'Banco Popular', 'Colpatria', 'Otros'];

  function showMessage(text, type) {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  }

  // Simulación de datos de ejemplo
  useEffect(() => {
    const sampleInvoices = [
      {
        id: 1,
        numero: 'INV-001',
        cliente: 'Juan Pérez',
        email: 'juan@email.com',
        telefono: '3001234567',
        direccion: 'Carrera 15 #45-30, Medellín',
        concepto: 'Desarrollo de aplicación web',
        subtotal: 2500000,
        impuestos: 475000,
        descuento: 0,
        total: 2975000,
        estado: 'Pendiente',
        fechaCreacion: '2024-12-01',
        fechaVencimiento: '2024-12-31',
        notas: 'Pago en 30 días'
      },
      {
        id: 2,
        numero: 'INV-002',
        cliente: 'María García',
        email: 'maria@empresa.com',
        telefono: '3109876543',
        direccion: 'Calle 50 #20-15, Bogotá',
        concepto: 'Consultoría en marketing digital',
        subtotal: 1200000,
        impuestos: 228000,
        descuento: 50000,
        total: 1378000,
        estado: 'Pagada',
        fechaCreacion: '2024-11-15',
        fechaVencimiento: '2024-12-15',
        notas: ''
      }
    ];

    const samplePayments = [
      {
        id: 1,
        facturaId: 2,
        facturaNumero: 'INV-002',
        monto: 1378000,
        metodoPago: 'Transferencia',
        referencia: 'TRF-789456',
        banco: 'Bancolombia',
        fechaPago: '2024-12-10',
        comprobante: 'COMP-001',
        estado: 'Confirmado',
        notas: 'Pago completo de la factura'
      }
    ];

    setInvoices(sampleInvoices);
    setPayments(samplePayments);
  }, []);

  // Función para generar número de factura automático
  const generateInvoiceNumber = () => {
    const nextNumber = invoices.length + 1;
    return `INV-${String(nextNumber).padStart(3, '0')}`;
  };

  // Función para calcular total de factura
  const calculateInvoiceTotal = (subtotal, impuestos, descuento) => {
    const sub = parseFloat(subtotal) || 0;
    const imp = parseFloat(impuestos) || 0;
    const desc = parseFloat(descuento) || 0;
    return sub + imp - desc;
  };

  // Función para manejar envío de facturas
  const handleInvoiceSubmit = async () => {
    if (!invoiceForm.cliente || !invoiceForm.concepto || !invoiceForm.subtotal) {
      showMessage('Por favor completa los campos obligatorios', 'error');
      return;
    }
    
    try {
      const total = calculateInvoiceTotal(invoiceForm.subtotal, invoiceForm.impuestos, invoiceForm.descuento);
      
      const newInvoice = {
        id: invoices.length + 1,
        numero: invoiceForm.numero || generateInvoiceNumber(),
        ...invoiceForm,
        subtotal: parseFloat(invoiceForm.subtotal),
        impuestos: parseFloat(invoiceForm.impuestos) || 0,
        descuento: parseFloat(invoiceForm.descuento) || 0,
        total: total,
        estado: 'Pendiente',
        fechaCreacion: new Date().toLocaleDateString('es-CO')
      };
      
      setInvoices(prev => [...prev, newInvoice]);
      setInvoiceForm({
        numero: '', cliente: '', email: '', telefono: '', direccion: '',
        concepto: '', subtotal: '', impuestos: '', descuento: '',
        fechaVencimiento: '', notas: ''
      });
      showMessage('¡Factura creada exitosamente!', 'success');
    } catch (error) {
      showMessage('Error al crear la factura', 'error');
    }
  };

  // Función para manejar envío de pagos
  const handlePaymentSubmit = async () => {
    if (!paymentForm.facturaNumero || !paymentForm.monto || !paymentForm.metodoPago) {
      showMessage('Por favor completa los campos obligatorios', 'error');
      return;
    }
    
    try {
      // Buscar la factura correspondiente
      const invoice = invoices.find(inv => inv.numero === paymentForm.facturaNumero);
      if (!invoice) {
        showMessage('No se encontró la factura especificada', 'error');
        return;
      }

      const newPayment = {
        id: payments.length + 1,
        facturaId: invoice.id,
        ...paymentForm,
        monto: parseFloat(paymentForm.monto),
        estado: 'Confirmado',
        fechaPago: paymentForm.fechaPago || new Date().toLocaleDateString('es-CO')
      };
      
      setPayments(prev => [...prev, newPayment]);
      
      // Actualizar estado de la factura si se paga completamente
      if (parseFloat(paymentForm.monto) >= invoice.total) {
        setInvoices(prev => prev.map(inv => 
          inv.id === invoice.id ? {...inv, estado: 'Pagada'} : inv
        ));
      }
      
      setPaymentForm({
        facturaNumero: '', monto: '', metodoPago: '', referencia: '',
        banco: '', fechaPago: '', comprobante: '', notas: ''
      });
      showMessage('¡Pago registrado exitosamente!', 'success');
    } catch (error) {
      showMessage('Error al registrar el pago', 'error');
    }
  };

  const handleInvoiceFormChange = (field, value) => {
    setInvoiceForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentFormChange = (field, value) => {
    setPaymentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredItems = activeTab === 'invoices' 
   ? invoices.filter(item => 
      (item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.numero.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === '' || item.estado === filterStatus)
    )
   : payments.filter(item => 
      (item.facturaNumero.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.metodoPago.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === '' || item.estado === filterStatus)
    );

  // Calcular estadísticas
  const totalInvoices = invoices.length;
  const totalPaid = invoices.filter(inv => inv.estado === 'Pagada').reduce((sum, inv) => sum + inv.total, 0);
  const totalPending = invoices.filter(inv => inv.estado === 'Pendiente').reduce((sum, inv) => sum + inv.total, 0);
  const totalPayments = payments.reduce((sum, pay) => sum + pay.monto, 0);

  return (
    <div className="relative overflow-hidden bg-gray-50 min-h-screen">
      {/* Header */}
      <DashHeader 
        title="Pagos y Facturas"  
        subtitle=""
      />

      {/* Mensaje de notificación */}
      <TopMessage 
        message={message} 
        type={messageType} 
        onClose={() => setMessage('')} 
      />

      <div className="p-6">
        {/* Título */}
        <div className="mb-6">
          <DashTitle title="Pagos y Facturas">
            Administra tus facturas, registra pagos y mantén control de tus finanzas
          </DashTitle>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Facturas</p>
                <p className="text-2xl font-semibold text-gray-900">{totalInvoices}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Cobrado</p>
                <p className="text-2xl font-semibold text-green-600">${totalPaid.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Por Cobrar</p>
                <p className="text-2xl font-semibold text-orange-600">${totalPending.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Pagos</p>
                <p className="text-2xl font-semibold text-purple-600">${totalPayments.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex items-center px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'invoices'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Facturas
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`flex items-center px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'payments'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Pagos
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-blue-600" />
                {activeTab === 'invoices' ? 'Nueva Factura' : 'Registrar Pago'}
              </h3>

              {activeTab === 'invoices' ? (
                <div className="space-y-4">
                  <SimpleInput
                    label="Número de Factura"
                    name="numero"
                    type="text"
                    value={invoiceForm.numero}
                    onChange={(e) => handleInvoiceFormChange('numero', e.target.value)}
                    placeholder={generateInvoiceNumber()}
                  />
                  
                  <SimpleInput
                    label="Cliente *"
                    name="cliente"
                    type="text"
                    value={invoiceForm.cliente}
                    onChange={(e) => handleInvoiceFormChange('cliente', e.target.value)}
                    placeholder="Nombre del cliente"
                  />

                  <SimpleInput
                    label="Email"
                    name="email"
                    type="email"
                    value={invoiceForm.email}
                    onChange={(e) => handleInvoiceFormChange('email', e.target.value)}
                    placeholder="cliente@email.com"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <SimpleInput
                      label="Teléfono"
                      name="telefono"
                      type="tel"
                      value={invoiceForm.telefono}
                      onChange={(e) => handleInvoiceFormChange('telefono', e.target.value)}
                      placeholder="3001234567"
                    />
                    
                    <SimpleInput
                      label="Fecha Vencimiento"
                      name="fechaVencimiento"
                      type="date"
                      value={invoiceForm.fechaVencimiento}
                      onChange={(e) => handleInvoiceFormChange('fechaVencimiento', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="font-medium text-base text-slate-800 mb-1 block">Dirección</label>
                    <textarea
                      rows="2"
                      value={invoiceForm.direccion}
                      onChange={(e) => handleInvoiceFormChange('direccion', e.target.value)}
                      className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500"
                      placeholder="Dirección del cliente"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-base text-slate-800 mb-1 block">Concepto *</label>
                    <textarea
                      rows="2"
                      value={invoiceForm.concepto}
                      onChange={(e) => handleInvoiceFormChange('concepto', e.target.value)}
                      className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500"
                      placeholder="Descripción del producto/servicio"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <SimpleInput
                      label="Subtotal *"
                      name="subtotal"
                      type="number"
                      value={invoiceForm.subtotal}
                      onChange={(e) => handleInvoiceFormChange('subtotal', e.target.value)}
                      placeholder="0.00"
                    />
                    
                    <SimpleInput
                      label="Impuestos"
                      name="impuestos"
                      type="number"
                      value={invoiceForm.impuestos}
                      onChange={(e) => handleInvoiceFormChange('impuestos', e.target.value)}
                      placeholder="0.00"
                    />
                    
                    <SimpleInput
                      label="Descuento"
                      name="descuento"
                      type="number"
                      value={invoiceForm.descuento}
                      onChange={(e) => handleInvoiceFormChange('descuento', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>

                  {(invoiceForm.subtotal || invoiceForm.impuestos || invoiceForm.descuento) && (
                    <div className="bg-gray-100 p-3 rounded-md">
                      <p className="text-sm font-medium text-gray-700">
                        Total: ${calculateInvoiceTotal(invoiceForm.subtotal, invoiceForm.impuestos, invoiceForm.descuento).toLocaleString()}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="font-medium text-base text-slate-800 mb-1 block">Notas</label>
                    <textarea
                      rows="2"
                      value={invoiceForm.notas}
                      onChange={(e) => handleInvoiceFormChange('notas', e.target.value)}
                      className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500"
                      placeholder="Notas adicionales"
                    />
                  </div>

                  <button
                    button="button"
                    onClick={handleInvoiceSubmit}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Crear Factura
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="font-medium text-base text-slate-800 mb-1 block">Número de Factura *</label>
                    <select
                      value={paymentForm.facturaNumero}
                      onChange={(e) => handlePaymentFormChange('facturaNumero', e.target.value)}
                      className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500"
                    >
                      <option value="">Seleccionar factura</option>
                      {invoices.filter(inv => inv.estado !== 'Pagada').map(inv => (
                        <option key={inv.id} value={inv.numero}>
                          {inv.numero} - {inv.cliente} (${inv.total.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <SimpleInput
                    label="Monto del Pago *"
                    name="monto"
                    type="number"
                    value={paymentForm.monto}
                    onChange={(e) => handlePaymentFormChange('monto', e.target.value)}
                    placeholder="0.00"
                  />

                  <div>
                    <label className="font-medium text-base text-slate-800 mb-1 block">Método de Pago *</label>
                    <select
                      value={paymentForm.metodoPago}
                      onChange={(e) => handlePaymentFormChange('metodoPago', e.target.value)}
                      className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500"
                    >
                      <option value="">Seleccionar método</option>
                      {paymentMethods.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <SimpleInput
                      label="Referencia"
                      name="referencia"
                      type="text"
                      value={paymentForm.referencia}
                      onChange={(e) => handlePaymentFormChange('referencia', e.target.value)}
                      placeholder="Número de referencia"
                    />
                    
                    <SimpleInput
                      label="Fecha de Pago"
                      name="fechaPago"
                      type="date"
                      value={paymentForm.fechaPago}
                      onChange={(e) => handlePaymentFormChange('fechaPago', e.target.value)}
                    />
                  </div>

                  {(paymentForm.metodoPago === 'Transferencia' || paymentForm.metodoPago === 'Tarjeta de Crédito' || paymentForm.metodoPago === 'Tarjeta de Débito') && (
                    <div>
                      <label className="font-medium text-base text-slate-800 mb-1 block">Banco</label>
                      <select
                        value={paymentForm.banco}
                        onChange={(e) => handlePaymentFormChange('banco', e.target.value)}
                        className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500"
                      >
                        <option value="">Seleccionar banco</option>
                        {banks.map(bank => (
                          <option key={bank} value={bank}>{bank}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <SimpleInput
                    label="Número de Comprobante"
                    name="comprobante"
                    type="text"
                    value={paymentForm.comprobante}
                    onChange={(e) => handlePaymentFormChange('comprobante', e.target.value)}
                    placeholder="Número del comprobante"
                  />

                  <div>
                    <label className="font-medium text-base text-slate-800 mb-1 block">Notas</label>
                    <textarea
                      rows="2"
                      value={paymentForm.notas}
                      onChange={(e) => handlePaymentFormChange('notas', e.target.value)}
                      className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500"
                      placeholder="Notas adicionales"
                    />
                  </div>

                  <button
                    button="button"
                    onClick={handlePaymentSubmit}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center font-medium"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Registrar Pago
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Lista de registros */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {activeTab === 'invoices' ? 'Facturas Registradas' : 'Pagos Registrados'}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="">Todos los estados</option>
                      {(activeTab === 'invoices' ? invoiceStatuses : ['Confirmado', 'Pendiente']).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-12">
                    {activeTab === 'invoices' ? (
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    ) : (
                      <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    )}
                    <p className="text-gray-500">
                      {searchTerm || filterStatus 
                        ? 'No se encontraron resultados' 
                        : `No hay ${activeTab === 'invoices' ? 'facturas' : 'pagos'} registrados`
                      }
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredItems.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border">
                        {activeTab === 'invoices' ? (
                          <>
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-lg">{item.numero}</h4>
                                <p className="text-sm text-gray-600 flex items-center">
                                  <User className="w-4 h-4 mr-1" />
                                  {item.cliente}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-green-600 text-lg">
                                  ${item.total.toLocaleString()}
                                </p>
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  item.estado === 'Pagada' ? 'bg-green-100 text-green-800' :
                                  item.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                  item.estado === 'Vencida' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {item.estado}
                                </span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                              <div>
                                <span className="font-medium">Email:</span> {item.email || 'No especificado'}
                              </div>
                              <div>
                                <span className="font-medium">Teléfono:</span> {item.telefono || 'No especificado'}
                              </div>
                              <div>
                                <span className="font-medium">Fecha Creación:</span> {item.fechaCreacion}
                              </div>
                              <div>
                                <span className="font-medium">Fecha Vencimiento:</span> {item.fechaVencimiento || 'Sin fecha'}
                              </div>
                            </div>

                            {item.direccion && (
                              <div className="text-sm text-gray-600 mb-2">
                                <span className="font-medium flex items-center">
                                  <Building className="w-4 h-4 mr-1" />
                                  Dirección:
                                </span> {item.direccion}
                              </div>
                            )}
                            
                            <div className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Concepto:</span> {item.concepto}
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 bg-white p-3 rounded border">
                              <div>
                                <span className="font-medium">Subtotal:</span> ${item.subtotal.toLocaleString()}
                              </div>
                              <div>
                                <span className="font-medium">Impuestos:</span> ${item.impuestos.toLocaleString()}
                              </div>
                              <div>
                                <span className="font-medium">Descuento:</span> ${item.descuento.toLocaleString()}
                              </div>
                            </div>

                            {item.notas && (
                              <div className="mt-3 text-sm text-gray-600">
                                <span className="font-medium">Notas:</span> {item.notas}
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-lg">Pago #{item.id}</h4>
                                <p className="text-sm text-gray-600">
                                  Factura: {item.facturaNumero}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-green-600 text-lg">
                                  ${item.monto.toLocaleString()}
                                </p>
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  item.estado === 'Confirmado' ? 'bg-green-100 text-green-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {item.estado}
                                </span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                              <div>
                                <span className="font-medium flex items-center">
                                  <CreditCard className="w-4 h-4 mr-1" />
                                  Método:
                                </span> {item.metodoPago}
                              </div>
                              <div>
                                <span className="font-medium flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  Fecha:
                                </span> {item.fechaPago}
                              </div>
                              {item.referencia && (
                                <div>
                                  <span className="font-medium">Referencia:</span> {item.referencia}
                                </div>
                              )}
                              {item.banco && (
                                <div>
                                  <span className="font-medium">Banco:</span> {item.banco}
                                </div>
                              )}
                            </div>

                            {item.comprobante && (
                              <div className="text-sm text-gray-600 mb-2">
                                <span className="font-medium">Comprobante:</span> {item.comprobante}
                              </div>
                            )}

                            {item.notas && (
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">Notas:</span> {item.notas}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPayments;