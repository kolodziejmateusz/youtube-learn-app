import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export type SortOption = "latest" | "oldest" | "popular";

type SortModalProps = {
  visible: boolean;
  onClose: () => void;
  onSortSelect: (option: SortOption) => void;
  selectedSort: SortOption;
};

export default function SortModal({
  visible,
  onClose,
  onSortSelect,
  selectedSort,
}: SortModalProps) {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "latest", label: "Upload date: latest" },
    { value: "oldest", label: "Upload date: oldest" },
    { value: "popular", label: "Most popular" },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sort records by:</Text>

          {sortOptions.map((option) => (
            <Pressable
              key={option.value}
              style={styles.optionContainer}
              onPress={() => {
                onSortSelect(option.value);
                onClose();
              }}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedSort === option.value && styles.radioButtonSelected,
                ]}
              >
                {selectedSort === option.value && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </Pressable>
          ))}

          <Pressable style={styles.confirmButton} onPress={onClose}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#8FA3B3",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  modalTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 24,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 8,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioButtonSelected: {
    backgroundColor: "#FFFFFF",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#8FA3B3",
  },
  optionLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#FFFFFF",
  },
  confirmButton: {
    backgroundColor: "#2B2D42",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 24,
    alignItems: "center",
  },
  confirmButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
  },
});
