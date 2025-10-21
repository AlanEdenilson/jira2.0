import { createPortal } from "react-dom"

interface estado {
    isOpen: boolean
    onClose(): void
}

const CreateProject = ({ isOpen, onClose, }: estado) => {
    if (!isOpen) return null;
    return createPortal(
        <div>
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Crear Nuevo Item</h2>

                    <form id="colorForm" className="space-y-5">


                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Ingresa el nombre"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Descripción
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                                placeholder="Ingresa la descripción"
                            ></textarea>
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Color
                            </label>
                            <div className="flex gap-3 items-center">
                                <input
                                    type="color"
                                    id="color"
                                    name="color"
                                    value="#3b82f6"
                                    className="h-12 w-20 rounded-lg border border-slate-300 cursor-pointer"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <div id="colorPreview" className="w-8 h-8 rounded-md border border-slate-300" ></div>
                                        <span id="colorValue" className="text-sm font-mono text-slate-600">#3b82f6</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 shadow-sm hover:shadow-md"
                        >
                            Guardar
                        </button>
                    </form>
                </div>
            </div>


        </div>,
        document.body
    )
}

export default CreateProject
