insert into terminal_commands (command, description, response, action_type, action_target, enabled, order_index)
values
('HELP', 'Muestra los comandos disponibles', null, 'system', 'help', true, 1),
('DIR', 'Lista los modulos del sistema', null, 'list', 'root', true, 2),
('TREE', 'Muestra el arbol general de PapaOS', null, 'list', 'tree', true, 3),
('CD LIBRO', 'Abre el Libro de Recuerdos', 'Abriendo modulo LIBRO...', 'navigate', '/libro', true, 4),
('CD ARBOL', 'Abre el Arbol de Ensenanzas', 'Abriendo modulo ARBOL...', 'navigate', '/arbol', true, 5),
('CD MENSAJES', 'Abre los mensajes familiares', 'Abriendo modulo MENSAJES...', 'navigate', '/mensajes', true, 6),
('TYPE BIENVENIDA.TXT', 'Muestra el mensaje de bienvenida', 'Bienvenido a PapaOS, un sistema construido con recuerdos.', 'message', null, true, 7),
('TYPE GRACIAS.TXT', 'Muestra una carta especial', 'Gracias por cada enseñanza, por cada esfuerzo silencioso y por construir con tu vida el sistema mas importante: la familia.', 'message', null, true, 8),
('WHOAMI', 'Muestra el perfil simbolico del usuario', 'Usuario: Papa. Rol: Ingeniero en Sistemas. Estado: Legado activo. Equipo: Macara.', 'message', null, true, 9),
('VER', 'Muestra la version del sistema', 'PapaOS Version 1.0 - Macara Legacy Terminal.', 'message', null, true, 10),
('ADMIN', 'Abre el acceso administrativo', 'Acceso administrativo solicitado.', 'navigate', '/admin/login', true, 11),
('CLS', 'Limpia la terminal', null, 'clear', null, true, 12),
('EXIT', 'Cierra la sesion simbolica', 'Sesion finalizada. El legado permanece activo.', 'message', null, true, 13);
