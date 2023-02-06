$(
    function () {
        $('[data-bs-toggle="popover"]').popover();
         $('[data-bs-toggle="tooltip"]').tooltip();
        $(".carousel").carousel(
        {
            interval: 3000
        }
        );
        $("#contacto").on("show.bs.modal",
        (e) => {
            console.log("Está siendo mostrado el modal");
            $("#contactoBtn").removeClass("btn-outline-secondary");
            $("#contactoBtn").addClass("btn-primary");
            $("#contactoBtn").prop("disabled", true);
        }
        );
        $("#contacto").on("shown.bs.modal",
        (e) => {
            console.log("Ya se mostró el modal");
        }
        );
        $("#contacto").on("hide.bs.modal",
        (e) => {
            console.log("Está siendo ocultado el modal");
            $("#contactoBtn").removeClass("btn-primary");
            $("#contactoBtn").addClass("btn-outline-secondary");
            $("#contactoBtn").prop("disabled", false);
        }
        );
        $("#contacto").on("hidden.bs.modal",
        (e) => {
            console.log("Ya se ocultó el modal");
        }
        );
    }
);