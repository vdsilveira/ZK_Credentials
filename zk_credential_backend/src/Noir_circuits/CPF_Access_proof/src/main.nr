fn main(cpf: u32, accessList: pub [u32; 5]) {
    let mut found = false;

    for i in 0..accessList.len() {
        if accessList[i] == cpf {
            found = true;
        }
    }

    assert(found);
}
#[test]
fn test_main() {
    main(123456789,[111111111, 222222222, 123456789, 444444444, 555555555]);
}

#[test(should_fail)]
fn test_fail_main() {
   main(1123456789,[111111111, 222222222, 123456789, 444444444, 555555555]);
}