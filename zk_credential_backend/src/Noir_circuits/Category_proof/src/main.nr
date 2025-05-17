fn main(driver_category: [u8; 2], required_letter: pub u8) {
    let mut found = false;

    for i in 0..driver_category.len() {
        if driver_category[i] == required_letter {
            found = true;
        }
    }

    assert(found); 
}

#[test]
fn test_main() {
    main([1,4],4);
}

#[test(should_fail)]
fn test_fail_main() {
    main([1,2],4);
}