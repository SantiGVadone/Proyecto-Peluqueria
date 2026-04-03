# README DEL FRONTEND DEL PROYECTO

# Pestaña del login 
- ✅ Recibir los datos
- ✅ Enviar los datos a la api
- ✅ Guardar el token en el localStorage
- ✅ Crear un usuario en PostMan
- ✅ Verificar el login exitoso
- ✅ Darle estilos al login

# Pestaña del register
- ✅ Crear el form
- ✅ Recibir los datos
- ✅ Enviar los datos a la API
- ✅ Mostrar un register-success
- ✅ Darle stilos al register

# APP
- ✅ Crear un Navbar
- ✅ Darle estilo al Navbar
-  Crear una pagina de bienvenida -> Derivando al Login
-  Darle estilo a la pagina de bienvenida

# Pestaña Calendar/ Calendario
- ✅ Diseñar en figma.
- ✅ Crear un Header
- ✅ Darle estilo al Header
- ✅ Crear las slotHour de la time line
- ✅ Darle diseño a los SlotHour
- ✅ Crear la TimeLine
- ✅ Darle diseño a la Timeline
-  Crear las AppointmentsCards
-  Darle diseño a las AppointmentsCards
-  Crear el menu de 'Seleccion de fecha'
-  Darle estilo al menu
-  Estilar toda la pagina en conjunto


# Pestaña Actions
- ✅ Diseñar en figma.
- ✅ Crear un carrusel con las opciones mas usadas.
- ✅ Darle estilo al carrusel.
-  Crear menus para cada una de las opciones necesarias ( Clientes, Turnos, Bonos, etc).
-  Darle estilo a los menus.


---------------------
# COSAS A TENER EN CUENTA (COSAS A SOLUCIONAR)

- EN LA DB (HABLANDO SOBRE LAS APPOINTMENTS) LO QUE GUARDO ES LA FECHA DE INICIO, EL HORARIO DE INICIO, Y EL HORARIO DE FIN
ES MEJOR EN VES DE GUARDAR EL HORARIO DE FIN, GUARDAR LA DURACION(MIN) DEL TURNO, DE ESTA FORMA, NO TENGO QUE ANDAR VALIDANDO QEU EL HORARIO DE FIN SEA MAYOR AL HORARIO DE INICIO Y TODO ESE TIPO DE COSAS, O QUE NO TENGAN UNA DIFERENCIA MAYOR A 'X', SIMPLEMENTE GUARDO UN HORARIO DE INICIO, Y UNA DURACION(MIN) DEL TURNO
    (540MIN>DURACION(MIN)>15MIN) 
    540min son 9hs desde las 10hs hasta las 19hs

- TAMBIEN TENGO QUE AGREGAR UN RUTA QUE DEVUELVA SOLO LAS APPOINTMENTS QUE ESTAN EN UN RANGO DE DIA:
  EJ:   /GET appointments?from=2024-03-22&to=2024-04-02