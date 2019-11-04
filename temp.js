jetpackService.getJetPack(jetpack_id).then(jetpack => {
    //console.log(jetpack);
    document.getElementById("modal_edit_jetpack_name").value = jetpack.name

    document.getElementById("modal_edit_jetpack_image").value = jetpack.image

    document.getElementById("edit_id_jetpack").value = jetpack.id;
});