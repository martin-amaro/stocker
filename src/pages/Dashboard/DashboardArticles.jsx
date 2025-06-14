import React, { useState, useEffect } from 'react'
import { Package, Settings, Plus, Save, Search, Filter } from 'lucide-react';

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

// Componente principal adaptado para usar los componentes anteriores
export const DashboardArticles = ({title = "Dashboard"}) => {
  const [activeTab, setActiveTab] = useState('articles');
  const [articles, setArticles] = useState([]);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  
  // Estados para formularios
  const [articleForm, setArticleForm] = useState({
    codigo: '',
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    proveedor: '',
    descripcion: ''
  });
  
  const [serviceForm, setServiceForm] = useState({
    codigo: '',
    nombre: '',
    tipo: '',
    precio: '',
    duracion: '',
    responsable: '',
    descripcion: '',
    requisitos: ''
  });

  // Categorías predefinidas
  const articleCategories = [
    'Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Libros', 'Herramientas', 'Otros'
  ];
  
  const serviceTypes = [
    'Consultoría', 'Mantenimiento', 'Desarrollo', 'Diseño', 'Soporte Técnico', 'Capacitación', 'Otros'
  ];

  function showMessage(text, type) {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  }

  // Simulación de datos de ejemplo para demostración
  useEffect(() => {
    // Datos de ejemplo para artículos
    const sampleArticles = [
      {
        id: 1,
        codigo: 'ART001',
        nombre: 'Laptop Dell Inspiron',
        categoria: 'Electrónica',
        precio: 2500000,
        stock: 5,
        proveedor: 'TechStore',
        descripcion: 'Laptop para uso profesional',
        fechaRegistro: '2024-12-01'
      },
      {
        id: 2,
        codigo: 'ART002',
        nombre: 'Mouse Inalámbrico',
        categoria: 'Electrónica',
        precio: 75000,
        stock: 15,
        proveedor: 'Logitech',
        descripcion: 'Mouse ergonómico inalámbrico',
        fechaRegistro: '2024-12-02'
      }
    ];

    // Datos de ejemplo para servicios
    const sampleServices = [
      {
        id: 1,
        codigo: 'SER001',
        nombre: 'Desarrollo Web',
        tipo: 'Desarrollo',
        precio: 80000,
        duracion: 8,
        responsable: 'Juan Pérez',
        descripcion: 'Desarrollo de sitios web responsivos',
        requisitos: 'Conocimientos en HTML, CSS, JavaScript',
        fechaRegistro: '2024-12-01'
      }
    ];

    setArticles(sampleArticles);
    setServices(sampleServices);
  }, []);

  // Función para manejar envío de artículos
  const handleArticleSubmit = async () => {
    if (!articleForm.codigo || !articleForm.nombre || !articleForm.precio) {
      showMessage('Por favor completa los campos obligatorios', 'error');
      return;
    }
    
    try {
      // Simular creación de nuevo artículo
      const newArticle = {
        id: articles.length + 1,
        ...articleForm,
        precio: parseFloat(articleForm.precio),
        stock: parseInt(articleForm.stock) || 0,
        fechaRegistro: new Date().toLocaleDateString('es-CO')
      };
      
      setArticles(prev => [...prev, newArticle]);
      setArticleForm({
        codigo: '', nombre: '', categoria: '', precio: '', 
        stock: '', proveedor: '', descripcion: ''
      });
      showMessage('¡Artículo registrado exitosamente!', 'success');
    } catch (error) {
      showMessage('Error al registrar el artículo', 'error');
    }
  };

  // Función para manejar envío de servicios (faltaba en el código original)
  const handleServiceSubmit = async () => {
    if (!serviceForm.codigo || !serviceForm.nombre || !serviceForm.precio) {
      showMessage('Por favor completa los campos obligatorios', 'error');
      return;
    }
    
    try {
      // Simular creación de nuevo servicio
      const newService = {
        id: services.length + 1,
        ...serviceForm,
        precio: parseFloat(serviceForm.precio),
        duracion: parseInt(serviceForm.duracion) || 0,
        fechaRegistro: new Date().toLocaleDateString('es-CO')
      };
      
      setServices(prev => [...prev, newService]);
      setServiceForm({
        codigo: '', nombre: '', tipo: '', precio: '', 
        duracion: '', responsable: '', descripcion: '', requisitos: ''
      });
      showMessage('¡Servicio registrado exitosamente!', 'success');
    } catch (error) {
      showMessage('Error al registrar el servicio', 'error');
    }
  };

  const handleArticleFormChange = (field, value) => {
    setArticleForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceFormChange = (field, value) => {
    setServiceForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredItems = activeTab === 'articles' 
   ? articles.filter(item => 
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === '' || item.categoria === filterCategory)
    )
   : services.filter(item => 
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === '' || item.tipo === filterCategory)
    );

  return (
    <div className="relative overflow-hidden bg-gray-50 min-h-screen">
      {/* Header usando el componente DashHeader */}
      <DashHeader 
        title="Artículos y servicios"  
      />

      {/* Mensaje de notificación usando TopMessage */}
      <TopMessage 
        message={message} 
        type={messageType} 
        onClose={() => setMessage('')} 
      />

      <div className="p-6">
        {/* Título usando DashTitle */}
        <div className="mb-6">
          <DashTitle title="Artículos y Servicios">
            Gestiona tu inventario y catálogo de servicios de manera eficiente
          </DashTitle>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex items-center px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'articles'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="w-4 h-4 mr-2" />
              Artículos
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'services'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings className="w-4 h-4 mr-2" />
              Servicios
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-blue-600" />
                {activeTab === 'articles' ? 'Nuevo Artículo' : 'Nuevo Servicio'}
              </h3>

              {activeTab === 'articles' ? (
                <div className="space-y-4">
                  <SimpleInput
                    label="Código *"
                    name="codigo"
                    type="text"
                    value={articleForm.codigo}
                    onChange={(e) => handleArticleFormChange('codigo', e.target.value)}
                    placeholder="Ej: ART001"
                  />
                  
                  <SimpleInput
                    label="Nombre del Artículo *"
                    name="nombre"
                    type="text"
                    value={articleForm.nombre}
                    onChange={(e) => handleArticleFormChange('nombre', e.target.value)}
                    placeholder="Nombre del producto"
                  />

                  <div>
                    <label className="font-medium text-base text-slate-800 mb-1 block">Categoría</label>
                    <select
                      value={articleForm.categoria}
                      onChange={(e) => handleArticleFormChange('categoria', e.target.value)}
                      className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500"
                    >
                      <option value="">Seleccionar categoría</option>
                      {articleCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <SimpleInput
                      label="Precio *"
                      name="precio"
                      type="number"
                      value={articleForm.precio}
                      onChange={(e) => handleArticleFormChange('precio', e.target.value)}
                      placeholder="0.00"
                    />
                    
                    <SimpleInput
                      label="Stock"
                      name="stock"
                      type="number"
                      value={articleForm.stock}
                      onChange={(e) => handleArticleFormChange('stock', e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <SimpleInput
                    label="Proveedor"
                    name="proveedor"
                    type="text"
                    value={articleForm.proveedor}
                    onChange={(e) => handleArticleFormChange('proveedor', e.target.value)}
                    placeholder="Nombre del proveedor"
                  />

                  <div>
                    <label className="font-medium text-base text-slate-800 mb-1 block">Descripción</label>
                    <textarea
                      rows="3"
                      value={articleForm.descripcion}
                      onChange={(e) => handleArticleFormChange('descripcion', e.target.value)}
                      className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500"
                      placeholder="Descripción del artículo"
                    />
                  </div>

                  <button
                    button="button"
                    onClick={handleArticleSubmit}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Registrar Artículo
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <SimpleInput
                    label="Código *"
                    name="codigo"
                    type="text"
                    value={serviceForm.codigo}
                    onChange={(e) => handleServiceFormChange('codigo', e.target.value)}
                    placeholder="Ej: SER001"
                  />
                  
                  <SimpleInput
                    label="Nombre del Servicio *"
                    name="nombre"
                    type="text"
                    value={serviceForm.nombre}
                    onChange={(e) => handleServiceFormChange('nombre', e.target.value)}
                    placeholder="Nombre del servicio"
                  />

                  <div>
                    <label className="font-medium text-base text-slate-800 mb-1 block">Tipo de Servicio</label>
                    <select
                      value={serviceForm.tipo}
                      onChange={(e) => handleServiceFormChange('tipo', e.target.value)}
                      className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500"
                    >
                      <option value="">Seleccionar tipo</option>
                      {serviceTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <SimpleInput
                      label="Precio/Hora *"
                      name="precio"
                      type="number"
                      value={serviceForm.precio}
                      onChange={(e) => handleServiceFormChange('precio', e.target.value)}
                      placeholder="0.00"
                    />
                    
                    <SimpleInput
                      label="Duración (hrs)"
                      name="duracion"
                      type="number"
                      value={serviceForm.duracion}
                      onChange={(e) => handleServiceFormChange('duracion', e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <SimpleInput
                    label="Responsable"
                    name="responsable"
                    type="text"
                    value={serviceForm.responsable}
                    onChange={(e) => handleServiceFormChange('responsable', e.target.value)}
                    placeholder="Persona responsable"
                  />

                  <div>
                    <label className="font-medium text-base text-slate-800 mb-1 block">Descripción</label>
                    <textarea
                      rows="2"
                      value={serviceForm.descripcion}
                      onChange={(e) => handleServiceFormChange('descripcion', e.target.value)}
                      className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500"
                      placeholder="Descripción del servicio"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-base text-slate-800 mb-1 block">Requisitos</label>
                    <textarea
                      rows="2"
                      value={serviceForm.requisitos}
                      onChange={(e) => handleServiceFormChange('requisitos', e.target.value)}
                      className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500"
                      placeholder="Requisitos necesarios"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleServiceSubmit}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Registrar Servicio
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
                    {activeTab === 'articles' ? 'Artículos Registrados' : 'Servicios Registrados'}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="">Todas las categorías</option>
                      {(activeTab === 'articles' ? articleCategories : serviceTypes).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchTerm || filterCategory 
                        ? 'No se encontraron resultados' 
                        : `No hay ${activeTab === 'articles' ? 'artículos' : 'servicios'} registrados`
                      }
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredItems.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">{item.nombre}</h4>
                            <p className="text-sm text-gray-600">Código: {item.codigo}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600 text-lg">
                              ${item.precio.toLocaleString()}
                              {activeTab === 'services' && '/hora'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          {activeTab === 'articles' ? (
                            <>
                              <div>
                                <span className="font-medium">Categoría:</span> {item.categoria || 'Sin categoría'}
                              </div>
                              <div>
                                <span className="font-medium">Stock:</span> {item.stock}
                              </div>
                              <div>
                                <span className="font-medium">Proveedor:</span> {item.proveedor || 'No especificado'}
                              </div>
                              <div>
                                <span className="font-medium">Registrado:</span> {item.fechaRegistro}
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <span className="font-medium">Tipo:</span> {item.tipo || 'Sin tipo'}
                              </div>
                              <div>
                                <span className="font-medium">Duración:</span> {item.duracion} hrs
                              </div>
                              <div>
                                <span className="font-medium">Responsable:</span> {item.responsable || 'No asignado'}
                              </div>
                              <div>
                                <span className="font-medium">Registrado:</span> {item.fechaRegistro}
                              </div>
                            </>
                          )}
                        </div>
                        
                        {item.descripcion && (
                          <div className="mt-3 text-sm text-gray-600">
                            <span className="font-medium">Descripción:</span> {item.descripcion}
                          </div>
                        )}

                        {activeTab === 'services' && item.requisitos && (
                          <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium">Requisitos:</span> {item.requisitos}
                          </div>
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

export default DashboardArticles;